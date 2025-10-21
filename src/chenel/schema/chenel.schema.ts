import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type ChenelDocument = HydratedDocument<Chenel>;

@Schema({ timestamps: true })
export class Chenel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: ["public", "private"], default: "public" })
  status: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  ownerId: User | Types.ObjectId;
}

export const ChenelSchema = SchemaFactory.createForClass(Chenel);
