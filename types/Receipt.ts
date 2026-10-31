import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { receipts } from "../schemas/receipt";

export type Receipts = InferSelectModel<typeof receipts>;
export type NewReceipt = InferInsertModel<typeof receipts>;
