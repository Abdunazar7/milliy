import { Module } from "@nestjs/common";
import { InvitationService } from "./invitation.service";
import { InvitationController } from "./invitation.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "../event/schema/event.schema";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Invitation, InvitationSchema } from "./schema/invitation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
