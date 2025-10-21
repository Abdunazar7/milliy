import mongoose from "mongoose";

export class CreateEventDto {
  name: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  description: string;
}
