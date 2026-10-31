import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { genTimestamp } from "./helpers/columns.helpers";

export const paymentTypes = pgTable("payment_types", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }),
	...genTimestamp,
});
