import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "../index";
import { certificationsRouter } from "./certifications";
import { contactRouter } from "./contact";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => "OK"),
	privateData: protectedProcedure.handler(({ context }) => ({
		message: "This is private",
		user: context.session?.user,
	})),
	contact: contactRouter,
	certifications: certificationsRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
