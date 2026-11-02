import {
	bigserial,
	decimal,
	index,
	integer,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";
import { product_types } from "./product_types.js";
import { genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const products = pgTable(
	"products",
	{
		id: bigserial("id", { mode: "number" }).primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		product_types_id: integer("product_types_id").references(
			() => product_types.id,
			{ onDelete: "cascade" },
		),
		price: decimal("price", { precision: 10, scale: 2 }).notNull(),
		...genTimestamp,
	},
	(t) => [index("products_idx").on(t.id)],
);

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
