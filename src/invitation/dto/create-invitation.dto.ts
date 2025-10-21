import mongoose from "mongoose";

export class CreateInvitationDto {
  eventId: mongoose.Schema.Types.ObjectId;
  from_user: mongoose.Schema.Types.ObjectId;
  to_user: mongoose.Schema.Types.ObjectId;
  status: string;
  message: string;
}
