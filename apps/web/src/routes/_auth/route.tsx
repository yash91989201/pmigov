import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
	beforeLoad: async () => {
		const session = await getUser();
		if (!session) {
			throw redirect({
				to: "/login",
			});
		}
		return { session };
	},
	loader: ({ context }) => {
		if (!context.session) {
			throw redirect({
				to: "/login",
			});
		}
	},
});

const navLinks = [
	{ to: "/dashboard/certifications", label: "Certifications" },
	{ to: "/dashboard/contact-responses", label: "Contact Responses" },
] as const;

function AuthLayout() {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<nav className="flex w-56 shrink-0 flex-col border-gray-200 border-r bg-white p-4">
				<div className="mb-6 font-bold text-[#1e0a45] text-lg tracking-tight">
					Dashboard
				</div>
				<ul className="flex flex-col gap-1">
					{navLinks.map(({ to, label }) => (
						<li key={to}>
							<Link
								activeOptions={{ exact: true }}
								activeProps={{
									className:
										"rounded-md bg-purple-50 px-3 py-2 font-medium text-[#5621b4] text-sm",
								}}
								className="rounded-md px-3 py-2 font-medium text-slate-600 text-sm transition-colors hover:bg-gray-100 hover:text-slate-900"
								to={to}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<main className="flex-1 overflow-auto">
				<Outlet />
			</main>
		</div>
	);
}
