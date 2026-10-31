import { pgTable, varchar } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const organizations = pgTable("organizations", {
	...genId,
	name: varchar("name", { length: 255 }),
	legal_form: varchar("legal_form", { length: 20 }),
	...genTimestamp,
});

export type Organization = InferSelectModel<typeof organizations>;
export type NewOrganization = InferInsertModel<typeof organizations>;
