import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { UpdateInvitationDto } from "./dto/update-invitation.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Invitation } from "./schema/invitation.schema";
import { Event } from "../event/schema/event.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<Invitation>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(createInvitationDto: CreateInvitationDto) {
    const { eventId, from_user, to_user } = createInvitationDto;

    const event = await this.eventModel.findById(eventId);
    if (!event) throw new NotFoundException("Bunday event topilmadi");

    const fromUserExists = await this.userModel.findById(from_user);
    const toUserExists = await this.userModel.findById(to_user);

    if (!fromUserExists || !toUserExists) {
      throw new NotFoundException("Bunday user(lar) topilmadi");
    }

    const invitation = await this.invitationModel.create(createInvitationDto);
    return invitation;
  }

  async findAll() {
    return this.invitationModel.find();
  }

  async findOne(id: string) {
    const invitation = await this.invitationModel.findById(id);

    if (!invitation) {
      throw new NotFoundException("Bunday invitation topilmadi");
    }

    return invitation;
  }

  async update(id: string, updateInvitationDto: UpdateInvitationDto) {
    const invitation = await this.invitationModel.findByIdAndUpdate(
      id,
      updateInvitationDto,
      { new: true }
    );

    if (!invitation) {
      throw new NotFoundException("Bunday invitation topilmadi");
    }

    return invitation;
  }

  async remove(id: string) {
    const invitation = await this.invitationModel.findByIdAndDelete(id);

    if (!invitation) {
      throw new NotFoundException("Bunday invitation topilmadi");
    }

    return {
      message: "Invitation muvaffaqiyatli o'chirildi",
      invitation,
    };
  }
}
