import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ versionKey: false, timestamps: true })
export class Chat {
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "user",
  })
  user_1Id: User;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "user",
  })
  user_2Id: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
