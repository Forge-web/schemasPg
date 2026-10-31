import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { paymentTypes } from "../schemas/payment_types";

export type PaymentType = InferSelectModel<typeof paymentTypes>;
export type NewPaymentType = InferInsertModel<typeof paymentTypes>;
