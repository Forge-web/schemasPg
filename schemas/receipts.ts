import {
	index,
	integer,
	numeric,
	pgTable,
	uuid,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers.js";
import { users } from "./users.js";
import { organizations } from "./organizations.js";
import { payment_types } from "./payment_types.js";
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
		payment_types_id: integer("payment_types_id")
			.references(() => payment_types.id)
			.notNull(),
		...genTimestamp,
	},
	(t) => [
		index("receipts_user_idx").on(t.users_id),
		index("receipts_organizations_idx").on(t.organizations_id),
	],
);

export type Receipts = InferSelectModel<typeof receipts>;
export type NewReceipt = InferInsertModel<typeof receipts>;
