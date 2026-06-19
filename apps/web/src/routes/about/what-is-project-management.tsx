import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/what-is-project-management")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<h1 className="font-bold text-2xl">What is Project Management</h1>
			<p className="mt-2 text-muted-foreground">Placeholder page</p>
		</div>
	);
}
