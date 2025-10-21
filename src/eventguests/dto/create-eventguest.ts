import mongoose from "mongoose";

export class CreateEventguestDto {
  eventId: mongoose.Schema.Types.ObjectId;
  ownerId: mongoose.Schema.Types.ObjectId;
}
