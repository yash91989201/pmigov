import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@pmigov/ui/components/breadcrumb";
import { IconArrowRight } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
	component: RouteComponent,
});

const PMI_DARK = "#200f3b";

function RouteComponent() {
	return (
		<main className="overflow-x-hidden">
			{/* ── Hero ── */}
			<section className="bg-pmi-surface-secondary">
				<div className="mx-auto max-w-7xl px-6 pt-10 lg:px-4 lg:pt-12">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink
									className="text-pmi-text-primary/70 hover:text-pmi-text-primary"
									render={<Link to="/" />}
								>
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="text-pmi-text-primary/50" />
							<BreadcrumbItem>
								<BreadcrumbPage className="text-pmi-text-primary">
									Templates and Insights
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="mx-auto max-w-4xl px-6 pt-12 pb-20 text-center sm:pt-16 lg:pb-24">
					<h1 className="mx-auto mb-6 max-w-3xl font-aeonik font-bold text-3xl text-pmi-text-primary leading-tight sm:text-4xl lg:text-5xl">
						Save time with project management templates and tools
					</h1>
					<p className="mx-auto max-w-2xl font-aeonik text-base text-muted-foreground leading-7 sm:text-lg">
						A curated selection of industry-vetted PMI templates, guides, and
						more to help you grow and maximize project success.
					</p>
				</div>
			</section>

			{/* ── The PMI Blog ── */}
			<section className="bg-pmi-surface-secondary">
				<div className="mx-auto max-w-screen-xl px-6 pt-12 pb-12 lg:px-4 lg:pt-20 lg:pb-20">
					<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
						<div>
							<h2 className="mb-4 font-aeonik font-bold text-2xl text-pmi-text-primary sm:text-3xl">
								The PMI Blog
							</h2>
							<p className="mb-6 max-w-xl font-aeonik text-base text-muted-foreground leading-7">
								The PMI Blog provides the latest insights and perspectives on
								new ways of working, organizational project management, and the
								future of the profession.
							</p>
							<Link
								className="inline-flex items-center gap-2 rounded-full bg-pmi-text-primary px-6 py-3 font-aeonik font-semibold text-base text-white transition hover:opacity-90"
								to="/blog"
							>
								Explore the Blog
								<IconArrowRight aria-hidden="true" className="size-4" />
							</Link>
						</div>
						{/* ponytail: image placeholder — swap to actual PMI url once asset is mirrored locally */}
						<div
							aria-label="The PMI Blog"
							className="aspect-[5/4] w-full rounded-2xl border border-border bg-muted"
							role="img"
						/>
					</div>
				</div>
			</section>

			{/* ── Projectified Podcast ── */}
			<section className="bg-pmi-surface-primary">
				<div className="mx-auto max-w-2xl px-6 pt-16 pb-16 text-center lg:px-4 lg:pt-20 lg:pb-20">
					<h2 className="mb-4 font-aeonik font-bold text-2xl text-pmi-text-primary sm:text-3xl">
						Projectified® Podcast
					</h2>
					<p className="mx-auto mb-8 max-w-xl font-aeonik text-base text-muted-foreground leading-7">
						Projectified® is your go-to resource for real conversations with
						project professionals, thought leaders, and executives about the
						trends and topics shaping the project management landscape.
					</p>
					<Link
						className="inline-flex items-center gap-2 rounded-full bg-pmi-text-primary px-6 py-3 font-aeonik font-semibold text-base text-white transition hover:opacity-90"
						to="/projectified-podcast"
					>
						Tune In Now
						<IconArrowRight aria-hidden="true" className="size-4" />
					</Link>
				</div>
			</section>

			{/* ── Membership CTA ── */}
			<section style={{ background: PMI_DARK }}>
				<div className="mx-auto max-w-2xl px-6 py-16 text-center lg:px-4 lg:py-24">
					<h2 className="mb-4 font-aeonik font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
						Ready to join PMI?
					</h2>
					<p className="mx-auto mb-8 max-w-xl font-aeonik text-base text-white/75 leading-7">
						Unlock opportunity with members-only access to career-long learning,
						project resources, and our global community.
					</p>
					<Link
						className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-aeonik font-semibold text-base text-pmi-text-primary transition hover:bg-white/90"
						to="/membership"
					>
						Become a Member
						<IconArrowRight aria-hidden="true" className="size-4" />
					</Link>
				</div>
			</section>
		</main>
	);
}
