import {
	bigserial,
	decimal,
	index,
	integer,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";
import { productTypes } from "./product_types.js";
import { genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const products = pgTable(
	"products",
	{
		id: bigserial("id", { mode: "bigint" }).primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		product_type: integer("product_type").references(
			() => productTypes.id,
			{ onDelete: "cascade" },
		),
		price: decimal("price", { precision: 10, scale: 2 }).notNull(),
		...genTimestamp,
	},
	(t) => [index("products_idx").on(t.id)],
);

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
