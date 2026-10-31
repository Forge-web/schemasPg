import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { invoice } from "../schemas/invoice";

export type Invoice = InferSelectModel<typeof invoice>;
export type NewInvoice = InferInsertModel<typeof invoice>;
