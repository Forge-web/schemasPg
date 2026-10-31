import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { productItems } from "../schemas/product_items";

export type ProductItem = InferSelectModel<typeof productItems>;
export type NewProductItem = InferInsertModel<typeof productItems>;
