import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EventguestsService } from "./eventguests.service";
import { CreateEventguestDto } from "./dto/create-eventguest";
import { UpdateEventguestDto } from "./dto/update-eventguest";

@Controller("eventguests")
export class EventguestsController {
  constructor(private readonly eventguestsService: EventguestsService) {}

  @Post()
  create(@Body() createEventguestDto: CreateEventguestDto) {
    return this.eventguestsService.create(createEventguestDto);
  }

  @Get()
  findAll() {
    return this.eventguestsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventguestsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventguestDto: UpdateEventguestDto
  ) {
    return this.eventguestsService.update(id, updateEventguestDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventguestsService.remove(id);
  }
}
