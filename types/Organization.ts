import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { organizations } from "../schemas/organizations";

export type Organization = InferSelectModel<typeof organizations>;
export type NewOrganization = InferInsertModel<typeof organizations>;
