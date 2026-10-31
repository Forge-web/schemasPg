import {
	bigint,
	index,
	numeric,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import { productItems } from "./product_items";
import { receipts } from "./receipt";
import {
	sql,
	SQL,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { products } from "./products";

export const receipt_positions = pgTable(
	"receipt_positions",
	{
		...genId,
		product_items_id: uuid("product_items_id").references(
			() => productItems.id,
			{ onDelete: "set null" },
		),
		product_id: bigint("product_id", { mode: "bigint" }).references(
			() => products.id,
			{ onDelete: "set null" },
		),
		receipt_id: uuid("receipt_id")
			.references(() => receipts.id, { onDelete: "restrict" })
			.notNull(),
		name: varchar("name", { length: 255 }).notNull(),
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
			(): SQL =>
				sql`${receipt_positions.price} * ${receipt_positions.quantity} `,
		),
		...genTimestamp,
	},
	(t) => [
		index("receipt_positions_receipt_idx").on(t.receipt_id),
		index("receipt_positions_product_idx").on(t.product_id),
		index("receipt_positions_idx").on(t.id),
	],
);

export type ReceiptPosition = InferSelectModel<
	typeof receipt_positions
>;
export type NewReceiptPosition = InferInsertModel<
	typeof receipt_positions
>;
