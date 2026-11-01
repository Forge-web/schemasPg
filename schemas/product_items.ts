import {
	bigint,
	index,
	numeric,
	pgTable,
	uuid,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import { products } from "./products.js";
import { invoice } from "./invoice.js";
import {
	SQL,
	sql,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";

export const product_items = pgTable(
	"product_items",
	{
		...genId,
		product_id: bigint("product_id", { mode: "bigint" })
			.references(() => products.id, { onDelete: "restrict" })
			.notNull(),
		invoice_id: uuid("invoice_id")
			.references(() => invoice.id, { onDelete: "set null" })
			.notNull(),
		quantity: numeric("quantity", {
			precision: 10,
			scale: 2,
		}).notNull(),
		price: numeric("price", { precision: 10, scale: 2 }),
		quantity_sum: numeric("quantity_sum", {
			precision: 10,
			scale: 2,
		}).generatedAlwaysAs(
			(): SQL =>
				sql`${product_items.quantity} * ${product_items.price}`,
		),
		...genTimestamp,
	},
	(t) => [
		index("product_items_product_idx").on(t.product_id),
		index("product_items_invoice_idx").on(t.invoice_id),
		index("product_items_idx").on(t.id),
	],
);

export type ProductItem = InferSelectModel<typeof product_items>;
export type NewProductItem = InferInsertModel<typeof product_items>;
