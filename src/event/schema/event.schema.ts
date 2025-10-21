import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type EventDocument = HydratedDocument<Event>;

@Schema({ versionKey: false })
export class Event {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  ownerId: User;

  @Prop()
  description: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
