import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { receipt_positions } from "../schemas/receipt_positions";

export type ReceiptPosition = InferSelectModel<
	typeof receipt_positions
>;
export type NewReceiptPosition = InferInsertModel<
	typeof receipt_positions
>;
