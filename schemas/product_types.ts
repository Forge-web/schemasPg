import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { genTimestamp, genId } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const product_types = pgTable("product_types", {
	...genId,
	name: varchar("name", { length: 255 }).notNull().unique(),
	...genTimestamp,
});

export type ProductType = InferSelectModel<typeof product_types>;
export type NewProductType = InferInsertModel<typeof product_types>;
