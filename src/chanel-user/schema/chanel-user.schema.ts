import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Document } from "mongoose";
import { Chenel } from "../../chenel/schema/chenel.schema";
import { User } from "../../user/schemas/user.schema";

export type ChenelUserDocument = HydratedDocument<ChenelUser>;

@Schema({ timestamps: true })
export class ChenelUser extends Document {
  @Prop({ type: Types.ObjectId, ref: "Chenel", required: true })
  chenelId: Types.ObjectId | Chenel;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId | User;
}

export const ChenelUserSchema = SchemaFactory.createForClass(ChenelUser);
