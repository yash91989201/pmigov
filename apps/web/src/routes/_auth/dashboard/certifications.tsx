import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { orpcClient, queryUtils } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/dashboard/certifications")({
	component: CertificationsComponent,
});

type Certification = {
	id: string;
	name: string;
	isActive: boolean;
	createdAt: Date | null;
};

function CreateForm({
	onSubmit,
	onCancel,
}: {
	onSubmit: (name: string, isActive: boolean) => Promise<void>;
	onCancel: () => void;
}) {
	const [name, setName] = useState("");
	const [isActive, setIsActive] = useState(true);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() === "") {
			return;
		}
		await onSubmit(name, isActive);
		setName("");
		setIsActive(true);
	};

	return (
		<div className="border-gray-100 border-b bg-purple-50/50 p-6 transition-all">
			<form className="flex items-end gap-4" onSubmit={handleSubmit}>
				<div className="flex-1 space-y-2">
					<label
						className="font-semibold text-[#5621b4] text-xs uppercase tracking-wider"
						htmlFor="name"
					>
						Certification Name
					</label>
					<input
						autoFocus
						className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-[#5621b4] focus:outline-none focus:ring-1 focus:ring-[#5621b4]"
						id="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g. PMP® Certification"
						type="text"
						value={name}
					/>
				</div>
				<div className="space-y-2 pb-2">
					<label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 text-sm">
						<input
							checked={isActive}
							className="h-4 w-4 rounded border-gray-300 text-[#5621b4] focus:ring-[#5621b4]"
							onChange={(e) => setIsActive(e.target.checked)}
							type="checkbox"
						/>
						Active
					</label>
				</div>
				<div className="flex gap-2 pb-[1px]">
					<button
						className="rounded-md bg-[#5621b4] px-4 py-2 font-medium text-sm text-white hover:bg-[#451a94]"
						type="submit"
					>
						Save
					</button>
					<button
						className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm hover:bg-gray-50"
						onClick={onCancel}
						type="button"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

function CertificationRow({
	cert,
	isEditing,
	deleteConfirm,
	onStartEdit,
	onCancelEdit,
	onUpdate,
	onRequestDelete,
	onCancelDelete,
	onConfirmDelete,
}: {
	cert: Certification;
	isEditing: boolean;
	deleteConfirm: boolean;
	onStartEdit: (cert: Certification) => void;
	onCancelEdit: () => void;
	onUpdate: (id: string, name: string, active: boolean) => Promise<void>;
	onRequestDelete: (id: string) => void;
	onCancelDelete: () => void;
	onConfirmDelete: (id: string) => Promise<void>;
}) {
	const [editName, setEditName] = useState(cert.name);
	const [editActive, setEditActive] = useState(cert.isActive);

	if (isEditing) {
		return (
			<tr className="group hover:bg-gray-50/50">
				<td className="px-6 py-4">
					<input
						className="w-full max-w-sm rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#5621b4] focus:outline-none focus:ring-1 focus:ring-[#5621b4]"
						onChange={(e) => setEditName(e.target.value)}
						type="text"
						value={editName}
					/>
				</td>
				<td className="px-6 py-4">
					<label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
						<input
							checked={editActive}
							className="h-4 w-4 rounded border-gray-300 text-[#5621b4] focus:ring-[#5621b4]"
							onChange={(e) => setEditActive(e.target.checked)}
							type="checkbox"
						/>
						<span className="font-medium text-slate-600 text-xs">
							{editActive ? "Active" : "Inactive"}
						</span>
					</label>
				</td>
				<td className="px-6 py-4 text-slate-500">
					{cert.createdAt ? new Date(cert.createdAt).toLocaleDateString() : "—"}
				</td>
				<td className="px-6 py-4 text-right">
					<div className="flex justify-end gap-2">
						<button
							className="rounded px-3 py-1 font-medium text-[#5621b4] text-xs hover:bg-purple-50 hover:underline"
							onClick={() => onUpdate(cert.id, editName, editActive)}
							type="button"
						>
							Save
						</button>
						<button
							className="rounded px-3 py-1 font-medium text-slate-500 text-xs hover:bg-gray-100 hover:text-slate-700"
							onClick={() => {
								setEditName(cert.name);
								setEditActive(cert.isActive);
								onCancelEdit();
							}}
							type="button"
						>
							Cancel
						</button>
					</div>
				</td>
			</tr>
		);
	}

	return (
		<tr className="group hover:bg-gray-50/50">
			<td className="px-6 py-4 font-medium text-slate-800">{cert.name}</td>
			<td className="px-6 py-4">
				<span
					className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${cert.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
				>
					<span
						className={`mr-1.5 h-1.5 w-1.5 rounded-full ${cert.isActive ? "bg-green-600" : "bg-slate-500"}`}
					/>
					{cert.isActive ? "Active" : "Inactive"}
				</span>
			</td>
			<td className="px-6 py-4 text-slate-500">
				{cert.createdAt
					? new Date(cert.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})
					: "—"}
			</td>
			<td className="px-6 py-4 text-right">
				{deleteConfirm ? (
					<div className="flex items-center justify-end gap-2">
						<span className="font-medium text-red-600 text-xs">Delete?</span>
						<button
							className="rounded bg-red-600 px-3 py-1 font-medium text-white text-xs hover:bg-red-700"
							onClick={() => onConfirmDelete(cert.id)}
							type="button"
						>
							Yes
						</button>
						<button
							className="rounded border border-gray-200 bg-white px-3 py-1 font-medium text-slate-600 text-xs hover:bg-gray-50"
							onClick={onCancelDelete}
							type="button"
						>
							No
						</button>
					</div>
				) : (
					<div className="flex justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
						<button
							className="font-medium text-slate-500 text-sm hover:text-[#5621b4]"
							onClick={() => {
								setEditName(cert.name);
								setEditActive(cert.isActive);
								onStartEdit(cert);
							}}
							type="button"
						>
							Edit
						</button>
						<button
							className="font-medium text-red-400 text-sm hover:text-red-600"
							onClick={() => onRequestDelete(cert.id)}
							type="button"
						>
							Delete
						</button>
					</div>
				)}
			</td>
		</tr>
	);
}

function CertificationsComponent() {
	const queryClient = useQueryClient();

	const { data: certifications, isLoading } = useQuery(
		queryUtils.certifications.list.queryOptions()
	);

	const createCert = useMutation({
		mutationFn: (data: { name: string; isActive: boolean }) =>
			orpcClient.certifications.create(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["certifications", "list"] }),
	});

	const updateCert = useMutation({
		mutationFn: (data: { id: string; name: string; isActive: boolean }) =>
			orpcClient.certifications.update(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["certifications", "list"] }),
	});

	const removeCert = useMutation({
		mutationFn: (data: { id: string }) =>
			orpcClient.certifications.remove(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["certifications", "list"] }),
	});

	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const handleCreate = async (name: string, isActive: boolean) => {
		await createCert.mutateAsync({ name, isActive });
		setIsAdding(false);
	};

	const handleUpdate = async (id: string, name: string, isActive: boolean) => {
		if (name.trim() === "") {
			return;
		}
		await updateCert.mutateAsync({ id, name, isActive });
		setEditingId(null);
	};

	if (isLoading) {
		return (
			<div className="flex h-96 w-full items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5621b4] border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-800">
			<div className="mx-auto max-w-5xl">
				<header className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="font-bold text-3xl text-[#1e0a45] tracking-tight">
							Manage Certifications
						</h1>
						<p className="mt-2 text-slate-500">
							Create and manage professional certifications available to users.
						</p>
					</div>
					{!isAdding && (
						<button
							className="rounded-lg bg-[#5621b4] px-5 py-2.5 font-semibold text-sm text-white shadow-md transition-all hover:bg-[#451a94] hover:shadow-lg active:scale-95"
							onClick={() => setIsAdding(true)}
							type="button"
						>
							+ Add New
						</button>
					)}
				</header>

				<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
					{isAdding && (
						<CreateForm
							onCancel={() => setIsAdding(false)}
							onSubmit={handleCreate}
						/>
					)}

					<div className="w-full overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="bg-gray-50 text-slate-500 text-xs uppercase">
								<tr>
									<th className="px-6 py-4 font-semibold tracking-wider">
										Name
									</th>
									<th className="px-6 py-4 font-semibold tracking-wider">
										Status
									</th>
									<th className="px-6 py-4 font-semibold tracking-wider">
										Created Date
									</th>
									<th className="px-6 py-4 text-right font-semibold tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{!certifications || certifications.length === 0 ? (
									<tr>
										<td
											className="px-6 py-12 text-center text-slate-400"
											colSpan={4}
										>
											No certifications found. Click "Add New" to create one.
										</td>
									</tr>
								) : (
									certifications.map((cert) => (
										<CertificationRow
											cert={cert}
											deleteConfirm={deleteConfirmId === cert.id}
											isEditing={editingId === cert.id}
											key={cert.id}
											onCancelDelete={() => setDeleteConfirmId(null)}
											onCancelEdit={() => setEditingId(null)}
											onConfirmDelete={async (id) => {
												await removeCert.mutateAsync({ id });
												setDeleteConfirmId(null);
											}}
											onRequestDelete={(id) => {
												setDeleteConfirmId(id);
												setEditingId(null);
											}}
											onStartEdit={(c) => {
												setEditingId(c.id);
												setDeleteConfirmId(null);
											}}
											onUpdate={handleUpdate}
										/>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
