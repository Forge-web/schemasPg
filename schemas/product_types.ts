import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { genTimestamp } from "./helpers/columns.helpers";

export const productTypes = pgTable("product_types", {
	id: serial("id").primaryKey().unique(),
	name: varchar("name", { length: 255 }).notNull().unique(),
	...genTimestamp,
});
