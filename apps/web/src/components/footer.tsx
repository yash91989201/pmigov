import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

const EXT_ICON = (
	<IconExternalLink aria-hidden="true" className="h-3 w-3 opacity-60" />
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
				label: "Latest from the Community",
				href: "https://community.pmi.org",
				external: true,
			},
			{
				label: "Discussions",
				href: "https://community.pmi.org",
				external: true,
			},
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
			{
				label: "PMI® Merch",
				href: "https://store.pmi.org",
				external: true,
			},
		],
	},
	{
		title: "Partner with PMI",
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
		links: [
			{ label: "Our Mission & Vision", href: "/about/mission" },
			{ label: "Our Purpose", href: "/about/purpose" },
			{ label: "Our Leadership", href: "/about/board-of-directors" },
			{ label: "The PMI Blog", href: "/blog" },
			{
				label: "What is Project Management?",
				href: "/about/what-is-project-management",
			},
			{
				label: "What is a Project Manager?",
				href: "/about/what-is-a-project-manager",
			},
			{ label: "Press & Media", href: "/about/press-media" },
			{ label: "Careers", href: "/about/careers" },
		],
	},
];

const LEGAL_LINKS = [
	{ label: "Accessibility", href: "/accessibility" },
	{ label: "Privacy", href: "/privacy" },
	{ label: "Sitemap", href: "/sitemap" },
	{ label: "Terms of use", href: "/terms-of-use" },
	{ label: "Purchasing Terms", href: "/purchasing-terms" },
	{
		label: "Advertising & Sponsorship",
		href: "/about/advertising-sponsorship",
	},
];

export function Footer() {
	return (
		<footer className="border-gray-200 border-t bg-white">
			<div className="px-6 pt-10 pb-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
					{/* Link columns */}
					<div className="lg:col-span-9">
						<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
							{FOOTER_COLUMNS.map((column) => (
								<div key={column.title}>
									<h3 className="mb-3 font-bold text-gray-900 text-sm">
										{column.title}
									</h3>
									<ul className="flex flex-col gap-1.5">
										{column.links.map((link) => (
											<li key={link.label}>
												<Link
													className="flex items-center gap-1 text-gray-600 text-xs leading-snug transition-colors hover:text-primary"
													rel={
														link.external ? "noopener noreferrer" : undefined
													}
													target={link.external ? "_blank" : undefined}
													to={link.href as never}
												>
													{link.label}
													{link.external ? EXT_ICON : null}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Support */}
					<div className="lg:col-span-3">
						<h3 className="mb-3 font-bold text-gray-900 text-sm">Support</h3>
						<ul className="flex flex-col gap-1.5">
							<li>
								<Link
									className="text-gray-600 text-xs transition-colors hover:text-primary"
									to="/support"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-600 text-xs transition-colors hover:text-primary"
									to="/store-help"
								>
									Store Help
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-gray-200 border-t">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
					<nav className="flex flex-wrap items-center gap-4">
						{LEGAL_LINKS.map((link) => (
							<Link
								className="text-gray-600 text-xs transition-colors hover:text-primary"
								key={link.label}
								to={link.href as never}
							>
								{link.label}
							</Link>
						))}
					</nav>
					<p className="text-gray-500 text-xs">
						© 2026 Project Management Institute
					</p>
				</div>
			</div>
		</footer>
	);
}
