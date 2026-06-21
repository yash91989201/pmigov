import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/purchasing-terms")({
	beforeLoad: () => {
		throw redirect({ to: "/about/purchasing-terms-and-conditions" });
	},
	component: () => null,
});
