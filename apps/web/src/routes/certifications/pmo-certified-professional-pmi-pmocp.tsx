import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/certifications/pmo-certified-professional-pmi-pmocp"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<h1 className="font-bold text-2xl">
				PMI PMO Certified Professional (PMI-PMOCP)™
			</h1>
			<p className="mt-2 text-muted-foreground">Placeholder page</p>
		</div>
	);
}
