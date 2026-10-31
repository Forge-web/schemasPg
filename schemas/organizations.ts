import { pgTable, varchar } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";

export const organizations = pgTable("organizations", {
	...genId,
	name: varchar("name", { length: 255 }),
	legal_form: varchar("legal_form", { length: 20 }),
	...genTimestamp,
});
