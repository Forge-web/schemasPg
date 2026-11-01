import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const payment_types = pgTable("payment_types", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }),
	...genTimestamp,
});

export type PaymentType = InferSelectModel<typeof payment_types>;
export type NewPaymentType = InferInsertModel<typeof payment_types>;
