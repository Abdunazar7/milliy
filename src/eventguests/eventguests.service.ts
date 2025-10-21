import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Eventguest } from "./schema/eventguest.schema";
import { CreateEventguestDto } from "./dto/create-eventguest";
import { UpdateEventguestDto } from "./dto/update-eventguest";
import { Event } from "../event/schema/event.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class EventguestsService {
  constructor(
    @InjectModel(Eventguest.name)
    private readonly eventguestModel: Model<Eventguest>,

    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  private validateObjectId(id: string, field: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${field} noto'g'ri ObjectId`);
    }
  }

  async create(createEventguestDto: CreateEventguestDto) {
    const { ownerId, eventId } = createEventguestDto;

    this.validateObjectId(String(ownerId), "ownerId");
    this.validateObjectId(String(eventId), "eventId");

    const user = await this.userModel.findById(ownerId);
    console.log(user);
    
    if (!user) {
      throw new NotFoundException("Bunday user topilmadi");
    }

    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException("Bunday event topilmadi");
    }

    const alreadyExists = await this.eventguestModel.findOne({
      ownerId,
      eventId,
    });
    if (alreadyExists) {
      throw new BadRequestException(
        "Bu user ushbu event uchun allaqachon guest sifatida qo'shilgan"
      );
    }

    const eventGuest = await this.eventguestModel.create(createEventguestDto);
    return eventGuest;
  }

  async findAll() {
    return this.eventguestModel.find();
  }

  async findOne(id: string) {
    this.validateObjectId(id, "id");
    const guest = await this.eventguestModel.findById(id);

    if (!guest) {
      throw new NotFoundException("Bunday guest topilmadi");
    }

    return guest;
  }

  async update(id: string, updateEventguestDto: UpdateEventguestDto) {
    this.validateObjectId(id, "id");

    const updatedGuest = await this.eventguestModel.findByIdAndUpdate(
      id,
      updateEventguestDto,
      { new: true }
    );

    if (!updatedGuest) {
      throw new NotFoundException("Yangilash uchun guest topilmadi");
    }

    return updatedGuest;
  }

  async remove(id: string) {
    this.validateObjectId(id, "id");

    const deletedGuest = await this.eventguestModel.findByIdAndDelete(id);

    if (!deletedGuest) {
      throw new NotFoundException("O'chirish uchun guest topilmadi");
    }

    return {
      message: "Guest muvaffaqiyatli o'chirildi",
      guest: deletedGuest,
    };
  }
}
