import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/business-solutions/commercial-partners/research-and-insights"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<h1 className="font-bold text-2xl">Enterprise Research & Insights</h1>
			<p className="mt-2 text-muted-foreground">Placeholder page</p>
		</div>
	);
}
