import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<h1 className="font-bold text-2xl">Home</h1>
			<p className="text-muted-foreground">Page under construction.</p>
		</div>
	);
}
