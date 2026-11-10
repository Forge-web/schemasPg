import { index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const users = pgTable(
	"users",
	{
		...genId,
		username: varchar("username", { length: 50 }).notNull().unique(),
		email: varchar("email", { length: 120 }).notNull().unique(),
		name: varchar("name", { length: 20 }),
		lastname: varchar("lastname", { length: 30 }),
		...genTimestamp,
	},
	(t) => [
		index("users_idx").on(t.id),
		index("users_username").on(t.username),
	],
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
