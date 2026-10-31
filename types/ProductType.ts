import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { productTypes } from "../schemas/product_types";

export type ProductType = InferSelectModel<typeof productTypes>;
export type NewProductType = InferInsertModel<typeof productTypes>;
