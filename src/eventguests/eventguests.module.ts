import { Module } from "@nestjs/common";
import { EventguestsService } from "./eventguests.service";
import { EventguestsController } from "./eventguests.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Eventguest, EventguestSchema } from "./schema/eventguest.schema";
import { Event, EventSchema } from "../event/schema/event.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Eventguest.name,
        schema: EventguestSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [EventguestsController],
  providers: [EventguestsService],
  exports: [EventguestsService],
})
export class EventguestsModule {}
