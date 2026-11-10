import { pgEnum, pgTable, numeric } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const invoice_type_enum = pgEnum("invoice_type", [
	"Поставка",
	"Продажа",
	"Возврат",
]);

export const invoice = pgTable("invoice", {
	...genId,
	invoice_type: invoice_type_enum().default("Поставка"),
	invoice_sum: numeric({ precision: 10, scale: 2 }),
	...genTimestamp,
});

export type Invoice = InferSelectModel<typeof invoice>;
export type NewInvoice = InferInsertModel<typeof invoice>;
