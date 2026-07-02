import { Button } from "@pmigov/ui/components/button";
import { FieldGroup } from "@pmigov/ui/components/field";
import { useAppForm } from "@pmigov/ui/components/form/hooks";
import { Label } from "@pmigov/ui/components/label";
import { SelectItem } from "@pmigov/ui/components/select";
import { Spinner } from "@pmigov/ui/components/spinner";
import {
	IconCheck,
	IconChevronDown,
	IconMail,
	IconMapPin,
	IconMessage,
	IconPhone,
	IconSend,
	IconX,
} from "@tabler/icons-react";
import { formOptions } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ContactFormSchema } from "@/lib/schemas/contact";
import type { ContactFormType } from "@/lib/types/contact";
import { queryUtils } from "@/utils/orpc";

export const Route = createFileRoute("/contact")({
	component: ContactComponent,
});

const subjectOptions = [
	"Certification Inquiry",
	"Membership Questions",
	"Event Registration",
	"Volunteering",
	"Partnership",
	"Other",
];

const formOpts = formOptions({
	defaultValues: {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "Certification Inquiry",
		message: "",
	} satisfies ContactFormType as ContactFormType,
});

function ContactComponent() {
	const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [certSearchQuery, setCertSearchQuery] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const { mutateAsync: createContact } = useMutation(
		queryUtils.contact.create.mutationOptions()
	);

	const form = useAppForm({
		...formOpts,
		validators: {
			onSubmitAsync: ContactFormSchema,
		},
		onSubmit: async ({ value }) => {
			await createContact({
				...value,
				phone: value.phone || undefined,
				selectedCerts,
			});
			form.reset();
			setSelectedCerts([]);
			toast.success("Message sent successfully!");
		},
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
				setCertSearchQuery("");
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (isDropdownOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isDropdownOpen]);

	const toggleCert = (cert: string) => {
		setSelectedCerts((prev) =>
			prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
		);
	};

	const removeCert = (cert: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedCerts((prev) => prev.filter((c) => c !== cert));
	};

	const { data: certificationsData } = useQuery(
		queryUtils.certifications.listActive.queryOptions()
	);

	const certificationOptions =
		certificationsData?.map((cert) => cert.name) ?? [];

	const filteredCertifications = certificationOptions.filter((cert) =>
		cert.toLowerCase().includes(certSearchQuery.toLowerCase())
	);

	return (
		<div className="min-h-screen w-full bg-slate-50 font-sans">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-[#1e0a45] pt-24 pb-48 text-white lg:pt-32 lg:pb-64">
				<div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/3 transform rounded-full bg-gradient-to-b from-[#5621b4] to-transparent opacity-20 blur-3xl" />
				<div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 transform rounded-full bg-gradient-to-t from-[#0075c9] to-transparent opacity-10 blur-3xl" />
				<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

				<div className="relative z-10 mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-8">
					<span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 font-bold text-cyan-300 text-xs uppercase tracking-widest backdrop-blur-md">
						24/7 Support
					</span>
					<h1 className="mb-8 font-extrabold text-5xl leading-tight tracking-tight md:text-7xl">
						Let's Start a Conversation
					</h1>
					<p className="mx-auto max-w-2xl font-light text-gray-300 text-xl leading-relaxed md:text-2xl">
						Have questions about certifications, membership, or events? Our team
						is ready to help you navigate your project management journey.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div className="relative z-20 mx-auto -mt-32 mb-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
				<div className="flex min-h-[800px] flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:flex-row">
					{/* Contact Info Sidebar */}
					<div className="relative flex flex-col justify-between overflow-hidden bg-[#13072e] p-10 text-white md:p-16 lg:w-2/5">
						<div className="absolute top-10 right-10 h-32 w-32 rounded-full border border-white/10 opacity-50" />
						<div className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-purple-500/20 blur-xl" />

						<div className="relative z-10">
							<h3 className="mb-2 font-bold text-3xl">Contact Information</h3>
							<p className="mb-12 text-gray-400">
								Find us through any of these channels.
							</p>

							<div className="space-y-8">
								<div className="group flex items-start gap-6">
									<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-[#13072e]">
										<IconPhone size={22} />
									</div>
									<div>
										<p className="mb-1 font-bold text-gray-400 text-sm uppercase tracking-wider">
											Call Us
										</p>
										<p className="font-semibold text-lg">+91 80640 55040</p>
										<p className="text-gray-500 text-sm">
											Mon-Fri, 9am - 5pm IST
										</p>
									</div>
								</div>

								<div className="group flex items-start gap-6">
									<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-purple-400 transition-all duration-300 group-hover:bg-purple-400 group-hover:text-[#13072e]">
										<IconMail size={22} />
									</div>
									<div>
										<p className="mb-1 font-bold text-gray-400 text-sm uppercase tracking-wider">
											Email Us
										</p>
										<p className="mb-1 font-semibold text-lg">
											sales@pmigov.com
										</p>
										<p className="text-gray-500 text-sm">
											Expect a reply within 24 hours
										</p>
									</div>
								</div>

								<div className="group flex items-start gap-6">
									<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400 transition-all duration-300 group-hover:bg-orange-400 group-hover:text-[#13072e]">
										<IconMapPin size={22} />
									</div>
									<div>
										<p className="mb-1 font-bold text-gray-400 text-sm uppercase tracking-wider">
											Visit HQ
										</p>
										<p className="font-semibold text-lg">
											105 WeWork, 1st Floor, Oberoi Commerz II, International
											Business Park, Oberoi Garden City,
										</p>
										<p className="text-gray-500 text-sm">
											Off Western Express Highway, Goregaon East, Mumbai,
											400063, Maharashtra, India
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative z-10 mt-16">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
								<div className="mb-4 flex items-center gap-3 text-cyan-300">
									<IconMessage size={20} />
									<span className="font-bold">Live Chat Support</span>
								</div>
								<p className="mb-4 text-gray-400 text-sm">
									Need immediate assistance? Our volunteers are available to
									chat during business hours.
								</p>
								<button
									className="border-cyan-400 border-b pb-1 font-bold text-sm text-white transition-colors hover:text-cyan-400"
									type="button"
								>
									Start Live Chat →
								</button>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="relative bg-white p-10 md:p-16 lg:w-3/5">
						<form.AppForm>
							<form
								className="flex h-full flex-col"
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<h3 className="mb-8 font-bold text-2xl text-gray-900">
									Send us a message
								</h3>

								<FieldGroup>
									<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
										<form.AppField name="firstName">
											{(field) => (
												<field.Input label="First Name" placeholder="Jane" />
											)}
										</form.AppField>

										<form.AppField name="lastName">
											{(field) => (
												<field.Input label="Last Name" placeholder="Doe" />
											)}
										</form.AppField>
									</div>

									<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
										<form.AppField name="email">
											{(field) => (
												<field.Input
													label="Email Address"
													placeholder="jane@example.com"
													type="email"
												/>
											)}
										</form.AppField>

										<form.AppField name="phone">
											{(field) => (
												<field.Input
													label="Phone (Optional)"
													placeholder="+91 98765 43210"
													type="tel"
												/>
											)}
										</form.AppField>
									</div>

									<form.AppField name="subject">
										{(field) => (
											<field.Select
												items={subjectOptions.map((option) => ({
													label: option,
													value: option,
												}))}
												label="Subject"
											>
												{subjectOptions.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</field.Select>
										)}
									</form.AppField>

									{/* Certification Dropdown */}
									<div className="relative" ref={dropdownRef}>
										<Label className="mb-2 block font-bold text-gray-500 text-xs uppercase tracking-wider">
											Interested Certifications
										</Label>
										<button
											className={`min-h-[56px] w-full cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 ${isDropdownOpen ? "border-purple-600 bg-white ring-4 ring-purple-600/10" : "border-gray-100 bg-gray-50 hover:border-gray-300"}`}
											onClick={() => setIsDropdownOpen(!isDropdownOpen)}
											type="button"
										>
											<div className="flex flex-wrap items-center gap-2">
												{selectedCerts.length === 0 ? (
													<span className="py-1 text-gray-400 text-sm">
														Select certifications...
													</span>
												) : (
													selectedCerts.map((cert) => (
														<span
															className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-3 py-1.5 font-bold text-purple-700 text-sm"
															key={cert}
														>
															{cert.split(" - ")[0]}
															<button
																className="rounded-full bg-white/50 p-0.5 transition-colors hover:text-red-500"
																onClick={(e) => removeCert(cert, e)}
																type="button"
															>
																<IconX size={12} />
															</button>
														</span>
													))
												)}
												<div className="ml-auto text-gray-400">
													<IconChevronDown
														className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-purple-600" : ""}`}
														size={18}
													/>
												</div>
											</div>
										</button>

										{isDropdownOpen && (
											<div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-2xl">
												<div className="sticky top-0 border-gray-100 border-b bg-white p-3">
													<input
														className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-purple-600 focus:outline-none"
														onChange={(e) => setCertSearchQuery(e.target.value)}
														onClick={(e) => e.stopPropagation()}
														placeholder="Search certifications..."
														ref={searchInputRef}
														type="text"
														value={certSearchQuery}
													/>
												</div>
												{filteredCertifications.length === 0 ? (
													<div className="px-5 py-4 text-center text-gray-500 text-sm">
														No certifications found
													</div>
												) : (
													filteredCertifications.map((cert) => {
														const isSelected = selectedCerts.includes(cert);
														return (
															<button
																className={`flex w-full cursor-pointer items-center gap-3 border-gray-50 border-b px-5 py-3.5 text-left transition-all duration-150 last:border-0 ${isSelected ? "bg-purple-50" : "hover:bg-gray-50"}`}
																key={cert}
																onClick={() => toggleCert(cert)}
																type="button"
															>
																<div
																	className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${isSelected ? "border-purple-600 bg-purple-600" : "border-gray-300 bg-white"}`}
																>
																	{isSelected && (
																		<IconCheck
																			className="text-white"
																			size={14}
																		/>
																	)}
																</div>
																<span
																	className={`text-sm ${isSelected ? "font-bold text-purple-900" : "text-gray-600"}`}
																>
																	{cert}
																</span>
															</button>
														);
													})
												)}
											</div>
										)}
									</div>

									<form.AppField name="message">
										{(field) => (
											<field.Textarea
												label="Message"
												placeholder="Tell us more about how we can help..."
											/>
										)}
									</form.AppField>

									<Button
										className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#5621b4] py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#431890] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
										disabled={form.state.isSubmitting}
										type="submit"
									>
										{form.state.isSubmitting ? (
											<>
												<Spinner className="text-white" />
												Sending...
											</>
										) : (
											<>
												Submit
												<IconSend
													className="transition-transform group-hover:translate-x-1"
													size={18}
												/>
											</>
										)}
									</Button>
								</FieldGroup>
							</form>
						</form.AppForm>
					</div>
				</div>
			</div>
		</div>
	);
}
