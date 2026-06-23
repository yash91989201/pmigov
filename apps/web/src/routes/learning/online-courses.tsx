import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/online-courses")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/learning/online-courses"!</div>;
}
