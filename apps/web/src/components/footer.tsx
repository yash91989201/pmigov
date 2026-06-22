import { Button } from "@pmigov/ui/components/button";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

const FOOTER_LINK_CLASS =
	"h-auto max-w-full items-start justify-start whitespace-normal p-0 text-left font-normal text-[#200f3b] text-xs break-words no-underline hover:text-[#4a2d6e] hover:underline";

const EXT_ICON = (
	<IconExternalLink aria-hidden="true" className="size-3 shrink-0 opacity-60" />
);

const FOOTER_COLUMNS = [
	{
		title: "Quick Links",
		links: [
			{ label: "Report PDUs", href: "/report-pdus", external: true },
			{ label: "Online Courses", href: "/learning/online-courses" },
			{ label: "PMBOK® Guide", href: "/standards/pmbok" },
			{ label: "Webinars", href: "/learning/webinars", external: true },
			{ label: "Events", href: "/events" },
			{ label: "Store", href: "/store" },
			{ label: "eLearning Gifts", href: "/learning/elearning-gifts" },
		],
	},
	{
		title: "Certifications",
		links: [
			{
				label: "Project Management Professional (PMP)®",
				href: "/certifications/project-management-pmp",
			},
			{
				label: "Certified Associate in Project Management (CAPM)®",
				href: "/certifications/certified-associate-capm",
			},
			{
				label: "PMI Agile Certified Practitioner (PMI-ACP)®",
				href: "/certifications/agile-acp",
			},
			{
				label: "Compare Certifications",
				href: "/certifications/compare",
			},
			{
				label: "Report Exam Misconduct",
				href: "/certifications/report-misconduct",
				external: true,
			},
		],
	},
	{
		title: "Membership",
		links: [
			{ label: "Become a Member", href: "/membership" },
			{ label: "Local Chapters", href: "/membership/chapters" },
			{ label: "Membership FAQs", href: "/membership/faq" },
		],
	},
	{
		title: "Community",
		links: [
			{
				label: "Templates",
				href: "/insights",
				external: true,
			},
			{
				label: "Blogs",
				href: "/blog",
				external: true,
			},
			{ label: "Volunteering", href: "/volunteer" },
		],
	},
	{
		title: "Partner with PMI Gov",
		links: [
			{
				label: "Enterprise and Commercial Partners",
				href: "/business-solutions/commercial-partners",
			},
			{
				label: "Training Partners",
				href: "/business-solutions/become-an-authorized-training-partner",
			},
		],
	},
	{
		title: "Organization",
		links: [{ label: "About Us", href: "/about" }],
	},
	{
		title: "Support",
		links: [
			{ label: "Contact Us", href: "/support" },
			{ label: "Store Help", href: "/store-help" },
		],
	},
] as const;

const LEGAL_LINKS = [
	{ label: "Accessibility", href: "/accessibility" },
	{ label: "Privacy", href: "/privacy" },
	{ label: "Sitemap", href: "/sitemap" },
	{ label: "Terms of use", href: "/terms" },
	{ label: "Purchasing Terms", href: "/purchasing-terms" },
] as const;

function FooterLink({
	external,
	href,
	label,
}: {
	external?: boolean;
	href: string;
	label: string;
}) {
	if (external) {
		return (
			<Button
				className={FOOTER_LINK_CLASS}
				nativeButton={false}
				render={
					// biome-ignore lint/a11y/useAnchorContent: visible label provided via Button children; aria-label added for SR fallback
					<a
						aria-label={label}
						href={href}
						rel="noopener noreferrer"
						target="_blank"
					/>
				}
				variant="link"
			>
				<span className="inline-flex max-w-full flex-wrap items-start gap-x-1 gap-y-0.5 leading-snug">
					<span className="break-words">{label}</span>
					{EXT_ICON}
				</span>
			</Button>
		);
	}

	return (
		<Button
			className={FOOTER_LINK_CLASS}
			nativeButton={false}
			render={<Link to={href as never} />}
			variant="link"
		>
			<span className="break-words">{label}</span>
		</Button>
	);
}

export function Footer() {
	return (
		<footer className="border-primary border-t bg-white">
			<div className="w-full px-6 pt-12 pb-10 md:px-10">
				<div className="grid grid-cols-2 gap-x-6 gap-y-10 text-left sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
					{FOOTER_COLUMNS.map((column) => (
						<div key={column.title}>
							<h3 className="mb-4 font-bold text-[#200f3b] text-sm">
								{column.title}
							</h3>
							<ul className="flex flex-col gap-2.5">
								{column.links.map((link) => (
									<li key={link.label}>
										<FooterLink
											external={link.external}
											href={link.href}
											label={link.label}
										/>
									</li>
								))}
							</ul>
						</div>
					))}

					<div className="col-span-2 flex flex-col gap-6 sm:col-span-3 md:col-span-4 lg:col-span-1">
						<Link className="inline-flex items-center gap-3" to="/">
							<img
								alt="PMI Gov"
								className="h-10 w-auto"
								height={40}
								src="/logo.webp"
								width={131}
							/>
						</Link>

						<div className="border-[#d4cbc3] border-t" />

						<p className="font-bold font-heading text-4xl text-[#200f3b] leading-none">
							PMI Gov®
						</p>
					</div>
				</div>
			</div>

			<div className="border-[#d4cbc3] border-t">
				<div className="flex w-full flex-col items-start justify-between gap-4 px-6 py-5 md:flex-row md:px-10">
					<nav className="flex flex-wrap items-start gap-x-5 gap-y-2">
						{LEGAL_LINKS.map((link) => (
							<Button
								className="h-auto max-w-full items-start justify-start whitespace-normal break-words p-0 text-left font-normal text-[#200f3b] text-xs no-underline hover:text-[#4a2d6e] hover:underline"
								key={link.label}
								nativeButton={false}
								render={<Link to={link.href as never} />}
								variant="link"
							>
								{link.label}
							</Button>
						))}
					</nav>
					<p className="text-[#6b5b7b] text-xs">
						© 2026 Project Management Institute Gov
					</p>
				</div>
			</div>
		</footer>
	);
}
