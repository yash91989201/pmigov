import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const certifications = pgTable(
	"certifications",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("certifications_createdAt_idx").on(table.createdAt)]
);
