import {
	index,
	integer,
	numeric,
	pgTable,
	uuid,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import { users } from "./users";
import { organizations } from "./organizations";
import { paymentTypes } from "./payment_types";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const receipts = pgTable(
	"receipts",
	{
		...genId,
		users_id: uuid("users_id")
			.references(() => users.id)
			.notNull(),
		organizations_id: uuid("organizations_id").references(
			() => organizations.id,
			{ onDelete: "set null" },
		),
		payment_types: integer("payment_types")
			.references(() => paymentTypes.id)
			.notNull(),
		check_sum: numeric("check_sum", {
			precision: 10,
			scale: 2,
		}).notNull(),
		...genTimestamp,
	},
	(t) => [
		index("receipts_user_idx").on(t.users_id),
		index("receipts_organizations_idx").on(t.organizations_id),
	],
);

export type Receipts = InferSelectModel<typeof receipts>;
export type NewReceipt = InferInsertModel<typeof receipts>;
