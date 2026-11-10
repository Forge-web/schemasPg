import { timestamp, serial } from "drizzle-orm/pg-core";

export const genTimestamp = {
	update_at: timestamp(),
	created_at: timestamp().defaultNow().notNull(),
};

export const genId = {
	id: serial("id").primaryKey(),
};
