import { createDb } from "@pmigov/db";
// biome-ignore lint/performance/noNamespaceImport: drizzleAdapter requires a schema namespace object
import * as schema from "@pmigov/db/schema/auth";
import { env } from "@pmigov/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export function createAuth() {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",

			schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		plugins: [tanstackStartCookies()],
	});
}

export const auth = createAuth();
