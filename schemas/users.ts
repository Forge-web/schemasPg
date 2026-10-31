import { index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";

export const users = pgTable(
	"users",
	{
		...genId,
		username: varchar("username", { length: 50 }).notNull().unique(),
		email: varchar("email", { length: 120 }).notNull().unique(),
		password_hash: text("password_hash").notNull(),
		...genTimestamp,
	},
	(t) => [
		index("users_idx").on(t.id),
		index("users_username").on(t.username),
	],
);
