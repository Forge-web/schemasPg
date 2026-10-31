import { pgEnum, pgTable, numeric } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";

const invoiceTypeEnum = pgEnum("type", [
	"Поставка",
	"Продажа",
	"Возврат",
]);

export const invoice = pgTable("invoice", {
	...genId,
	invoice_type: invoiceTypeEnum("invoice_type")
		.default("Поставка")
		.notNull(),
	invoice_sum: numeric({ precision: 10, scale: 2 }),
	...genTimestamp,
});
