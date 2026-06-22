import { db } from "@pmigov/db";
import { certifications } from "@pmigov/db/schema/certifications";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

export const certificationsRouter = {
	list: publicProcedure.handler(
		async () => await db.select().from(certifications)
	),

	listActive: publicProcedure.handler(
		async () =>
			await db
				.select()
				.from(certifications)
				.where(eq(certifications.isActive, true))
	),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1, "Name is required"),
				isActive: z.boolean().default(true),
			})
		)
		.handler(async ({ input }) => {
			const id = crypto.randomUUID();
			await db.insert(certifications).values({
				id,
				...input,
			});
			return { success: true };
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Name is required"),
				isActive: z.boolean(),
			})
		)
		.handler(async ({ input }) => {
			const { id, ...data } = input;
			await db
				.update(certifications)
				.set(data)
				.where(eq(certifications.id, id));
			return { success: true };
		}),

	remove: protectedProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			await db.delete(certifications).where(eq(certifications.id, input.id));
			return { success: true };
		}),
};
