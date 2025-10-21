import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { GroupUser } from "../../group-users/schemas/group-user.schema";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ versionKey: false, timestamps: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop()
  status: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "GroupUser",
      },
    ],
  })
  group_users: GroupUser[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
