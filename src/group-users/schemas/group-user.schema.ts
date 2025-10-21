import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Group } from "../../group/schemas/group.schema";
import { User } from "../../user/schemas/user.schema";

export type GroupUserDocument = HydratedDocument<GroupUser>;

@Schema({ versionKey: false, timestamps: true })
export class GroupUser {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: "Group", required: true })
  groupId: Group;
}

export const GroupUserSchema = SchemaFactory.createForClass(GroupUser);
