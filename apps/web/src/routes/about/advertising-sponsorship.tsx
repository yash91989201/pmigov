import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@pmigov/ui/components/breadcrumb";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/about/advertising-sponsorship")({
	component: RouteComponent,
});

const COUNTRIES = [
	"United States",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Congo",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Estonia",
	"Ethiopia",
	"Finland",
	"France",
	"Gabon",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Guatemala",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kuwait",
	"Kyrgyzstan",
	"Latvia",
	"Lebanon",
	"Libya",
	"Lithuania",
	"Luxembourg",
	"Malaysia",
	"Maldives",
	"Malta",
	"Mexico",
	"Moldova",
	"Mongolia",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Nigeria",
	"Norway",
	"Oman",
	"Pakistan",
	"Panama",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Romania",
	"Russia",
	"Rwanda",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"South Africa",
	"South Korea",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Sweden",
	"Switzerland",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"Uruguay",
	"Uzbekistan",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

const AD_TYPES = [
	"Dedicated Email",
	"eNewsletters",
	"Digital Display",
	"Lead Generation",
	"Custom Webinars/White Papers",
	"Virtual Events",
	"In-Person Events",
	"Other",
];

const inputCls =
	"w-full rounded border border-border bg-[#faf9f8] px-3 py-2 font-aeonik text-sm text-pmi-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
const labelCls = "font-aeonik text-sm font-semibold text-pmi-text-primary";

function RequiredStar() {
	return <span className="text-red-600">*</span>;
}

function Field({
	label,
	required,
	children,
}: {
	label: string;
	required?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			{/* biome-ignore lint/a11y/noLabelWithoutControl: label and input are associated via layout, control is sibling child */}
			<label className={labelCls}>
				{label} {required && <RequiredStar />}
			</label>
			{children}
		</div>
	);
}

function RouteComponent() {
	const [adAgency, setAdAgency] = useState("no");
	const [adTypes, setAdTypes] = useState<string[]>([]);
	const [submitted, setSubmitted] = useState(false);

	function toggleAdType(type: string) {
		setAdTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitted(true);
	}

	return (
		<main className="overflow-x-hidden" id="main-layout">
			{/* Hero */}
			<div className="w-full bg-pmi-surface-secondary">
				<div className="mx-auto max-w-screen-xl px-6 pt-6 lg:px-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{/* biome-ignore lint/a11y/useAnchorContent: TanStack BreadcrumbLink render prop — content is in children */}
								<BreadcrumbLink render={<a href="/about" />}>
									What We Do
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Advertising &amp; Sponsorship</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="mx-auto max-w-screen-xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:px-4">
					<h1 className="mb-6 font-aeonik font-bold text-header-md text-pmi-text-primary sm:text-header-xl">
						Advertising &amp; Sponsorship
					</h1>
					<div className="max-w-2xl space-y-3">
						<p className="font-aeonik text-lg text-pmi-text-primary">
							Are you looking to reach global influencers through the multimedia
							channels they trust and rely on most? We&apos;ve got you covered.
						</p>
						<p className="font-aeonik text-lg text-pmi-text-primary">
							Offering a variety of interactive channels, PMI lets you reach
							this engaged audience to nurture your brand, convert prospects to
							buyers and align your message with leading-edge content.
						</p>
					</div>
				</div>
			</div>

			{/* Content card */}
			<div
				className="relative w-full overflow-hidden bg-pmi-surface-primary"
				style={{
					borderRadius: "var(--pmi-rounded-md) var(--pmi-rounded-md) 0 0",
					marginTop: "calc(-1 * var(--pmi-rounded-md))",
				}}
			>
				<div className="px-6 py-10 lg:px-4 lg:py-16">
					<div className="mx-auto w-full max-w-md">
						<h2 className="mb-10 text-center font-aeonik font-bold text-3xl text-pmi-text-primary">
							Access our online media guide
						</h2>

						{submitted ? (
							<div className="rounded-lg border border-border bg-green-50 px-8 py-10 text-center">
								<p className="font-aeonik font-semibold text-green-700 text-lg">
									Thank you for submitting the form.
								</p>
							</div>
						) : (
							<form className="space-y-6" onSubmit={handleSubmit}>
								{/* First Name */}
								<Field label="First Name" required>
									<input
										className={inputCls}
										maxLength={50}
										name="firstname"
										placeholder="First Name"
										required
										type="text"
									/>
								</Field>

								{/* Last Name */}
								<Field label="Last Name" required>
									<input
										className={inputCls}
										maxLength={50}
										name="lastname"
										placeholder="Last Name"
										required
										type="text"
									/>
								</Field>

								{/* Email */}
								<Field label="Email" required>
									<input
										className={inputCls}
										name="email"
										placeholder="Email"
										required
										type="email"
									/>
								</Field>

								{/* Job Title */}
								<Field label="Job Title">
									<input
										className={inputCls}
										maxLength={100}
										name="jobtitle"
										placeholder="Job Title"
										type="text"
									/>
								</Field>

								{/* Company Name */}
								<Field label="Company Name">
									<input
										className={inputCls}
										maxLength={100}
										name="company"
										placeholder="Company Name"
										type="text"
									/>
								</Field>

								{/* Country */}
								<Field label="Country">
									<select className={inputCls} defaultValue="" name="country">
										<option disabled value="">
											Country
										</option>
										{COUNTRIES.map((c) => (
											<option key={c} value={c}>
												{c}
											</option>
										))}
									</select>
								</Field>

								{/* Type of Advertising */}
								<div className="flex flex-col gap-3">
									<span className={labelCls}>
										Type of Advertising Interested
									</span>
									<div className="flex flex-col gap-2">
										{AD_TYPES.map((type) => (
											<label
												className="flex cursor-pointer items-center gap-3 font-aeonik text-pmi-text-primary text-sm"
												key={type}
											>
												<input
													checked={adTypes.includes(type)}
													className="h-4 w-4 flex-shrink-0 accent-primary"
													name="adtype"
													onChange={() => toggleAdType(type)}
													type="checkbox"
													value={type}
												/>
												{type}
											</label>
										))}
									</div>
								</div>

								{/* Other advertising */}
								<Field label="Other advertising">
									<input
										className={inputCls}
										name="other_advertising"
										placeholder="Other advertising"
										type="text"
									/>
								</Field>

								{/* Ad Agency */}
								<div className="flex flex-col gap-3">
									<span className={labelCls}>Are you an Ad Agency?</span>
									<div className="flex flex-col gap-2">
										{["Yes", "No"].map((opt) => (
											<label
												className="flex cursor-pointer items-center gap-3 font-aeonik text-pmi-text-primary text-sm"
												key={opt}
											>
												<input
													checked={adAgency === opt.toLowerCase()}
													className="h-4 w-4 flex-shrink-0 accent-primary"
													name="adagency"
													onChange={() => setAdAgency(opt.toLowerCase())}
													type="radio"
													value={opt.toLowerCase()}
												/>
												{opt}
											</label>
										))}
									</div>
								</div>

								{/* Campaign Start Date */}
								<Field label="What is your anticipated campaign start date?">
									<input
										className={inputCls}
										name="campaign_start"
										type="date"
									/>
								</Field>

								{/* Additional Comments */}
								<Field label="Please enter any additional comments to help us better understand your campaign needs and preferences:">
									<textarea
										className={`${inputCls} h-32 resize-y`}
										name="comments"
										placeholder="Additional Comments"
									/>
								</Field>

								{/* Privacy acknowledgment */}
								<label className="flex cursor-pointer items-start gap-3 font-aeonik text-pmi-text-primary text-sm">
									<input
										className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
										name="privacy_acknowledged"
										required
										type="checkbox"
									/>
									<span>
										Privacy Policy &amp; Terms of Use Acknowledged{" "}
										<RequiredStar />
									</span>
								</label>

								{/* PMI permission */}
								<label className="flex cursor-pointer items-start gap-3 font-aeonik text-pmi-text-primary text-sm">
									<input
										className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
										defaultChecked
										name="pmi_permission"
										type="checkbox"
									/>
									<span>
										By checking this box, you grant PMI permission to contact
										you about your inquiry and send occasional offers and
										promotional emails. You can unsubscribe at any time.
									</span>
								</label>

								{/* reCAPTCHA mock */}
								<div className="flex items-center justify-center">
									<div className="flex w-[300px] items-center gap-4 rounded border border-border bg-[#f9f9f9] px-4 py-3 shadow-sm">
										<input
											className="h-5 w-5 flex-shrink-0 accent-primary"
											required
											type="checkbox"
										/>
										<span className="font-aeonik text-pmi-text-primary text-sm">
											I&apos;m not a robot
										</span>
										<div className="ml-auto flex flex-col items-center">
											<div className="text-xl">🔒</div>
											<span className="text-[10px] text-muted-foreground">
												reCAPTCHA
											</span>
											<span className="text-[9px] text-muted-foreground">
												Privacy - Terms
											</span>
										</div>
									</div>
								</div>

								{/* Submit */}
								<div className="flex justify-center">
									<button
										className="rounded bg-primary px-8 py-2.5 font-aeonik font-semibold text-primary-foreground hover:bg-primary/90"
										type="submit"
									>
										Submit
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
