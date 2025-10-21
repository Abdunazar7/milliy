import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { GroupUser } from "../../group-users/schemas/group-user.schema";
import { Relation } from "../../relation/schemas/relation.schema";
import { Chat } from "../../chat/schemas/chat.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ enum: ["male", "female"] })
  gender: "male" | "female";

  @Prop()
  bio: string;

  @Prop()
  age: number;

  @Prop({ default: false })
  protection_2nd: boolean;

  @Prop()
  refresh_token: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "GroupUser",
      },
    ],
  })
  group_users: GroupUser[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Relation",
      },
    ],
  })
  relations: Relation[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
      },
    ],
  })
  chats: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
