import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;

  @Prop()
  refresh_token: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
