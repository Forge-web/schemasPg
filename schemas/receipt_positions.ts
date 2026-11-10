import {
	index,
	integer,
	numeric,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import {
	sql,
	SQL,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";

import { product_types } from "./product_types.js";

export const products = pgTable(
	"products",
	{
		...genId,
		name: varchar("name", { length: 255 }).notNull(),
		product_type_id: integer("product_types_id").references(
			() => product_types.id,
			{ onDelete: "cascade" },
		),
		quantity: numeric("quantity", {
			precision: 10,
			scale: 2,
		}).notNull(),
		price: numeric("price", {
			precision: 10,
			scale: 2,
		}).notNull(),
		sum: numeric("sum", {
			precision: 10,
			scale: 2,
		}).generatedAlwaysAs(
			(): SQL => sql`${products.price} * ${products.quantity} `,
		),
		...genTimestamp,
	},
	(t) => [index("products_idx").on(t.id)],
);

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
