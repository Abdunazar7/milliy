import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Event } from "./schema/event.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { ownerId } = createEventDto;

    if (!Types.ObjectId.isValid(String(ownerId))) {
      throw new BadRequestException("Xato ownerId (ObjectId emas)");
    }

    const owner = await this.userModel.findById(ownerId);
    if (!owner) {
      throw new NotFoundException("Bunday owner topilmadi");
    }

    const event = await this.eventModel.create(createEventDto);
    return event;
  }

  async findAll() {
    return this.eventModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Xato event id");
    }

    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException("Event topilmadi");
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Xato event id");
    }

    const updated = await this.eventModel.findByIdAndUpdate(
      id,
      { $set: updateEventDto },
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException("Event topilmadi");
    }

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Xato event id");
    }

    const deleted = await this.eventModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Event topilmadi");
    }

    return { message: "Event muvaffaqiyatli o‘chirildi", id };
  }
}
