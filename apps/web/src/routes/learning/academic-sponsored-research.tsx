import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/academic-sponsored-research")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<h1 className="font-bold text-2xl">Academic Sponsored Research</h1>
			<p className="mt-2 text-muted-foreground">Placeholder page</p>
		</div>
	);
}
