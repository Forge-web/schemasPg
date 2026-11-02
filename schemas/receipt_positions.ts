import {
	bigint,
	index,
	numeric,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import { product_items } from "./product_items.js";
import { receipts } from "./receipts.js";
import {
	sql,
	SQL,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { products } from "./products.js";

export const receipt_positions = pgTable(
	"receipt_positions",
	{
		...genId,
		product_items_id: uuid("product_items_id").references(
			() => product_items.id,
			{ onDelete: "set null" },
		),
		product_id: bigint("product_id", { mode: "number" }).references(
			() => products.id,
			{ onDelete: "set null" },
		),
		receipts_id: uuid("receipts_id")
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
		index("receipt_positions_receipt_idx").on(t.receipts_id),
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
