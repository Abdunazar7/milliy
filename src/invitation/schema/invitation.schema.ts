import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({ versionKey: false })
export class Invitation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  })
  eventId: Event;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  from_user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  to_user: User;

  @Prop()
  status: string;

  @Prop()
  message: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
