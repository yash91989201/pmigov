import { db } from "@pmigov/db";
import { contactResponses } from "@pmigov/db/schema/contact";
import { desc } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

const contactFormSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please enter a valid email address"),
	phone: z.string().optional(),
	subject: z.string().min(1, "Please select a subject"),
	selectedCerts: z.array(z.string()).optional(),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

export const contactRouter = {
	list: protectedProcedure.handler(
		async () =>
			await db
				.select()
				.from(contactResponses)
				.orderBy(desc(contactResponses.createdAt))
	),

	create: publicProcedure
		.input(contactFormSchema)
		.handler(async ({ input }) => {
			const id = crypto.randomUUID();
			await db.insert(contactResponses).values({
				id,
				...input,
				phone: input.phone || null,
				selectedCerts: input.selectedCerts || [],
			});
			return { success: true };
		}),
};
