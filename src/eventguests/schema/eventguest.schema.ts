import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Event } from "../../event/schema/event.schema";
import { User } from "../../user/schemas/user.schema";

export type EventguestDocument = HydratedDocument<Eventguest>;

@Schema({ versionKey: false })
export class Eventguest {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  eventId: Event;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  userId: User;
}

export const EventguestSchema = SchemaFactory.createForClass(Eventguest);
