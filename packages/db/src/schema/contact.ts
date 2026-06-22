import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contactResponses = pgTable(
	"contact_responses",
	{
		id: text("id").primaryKey(),
		firstName: text("first_name").notNull(),
		lastName: text("last_name").notNull(),
		email: text("email").notNull(),
		phone: text("phone"),
		subject: text("subject").notNull(),
		selectedCerts: text("selected_certs").array(),
		message: text("message").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("contact_responses_createdAt_idx").on(table.createdAt)]
);
