import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class ChatService {
constructor(
    @InjectModel(Chat.name) private readonly chatSchema: Model<Chat>,
    @InjectModel(User.name) private readonly userSchema: Model<User>
  ) {}

  async create(createChatDto: CreateChatDto) {
    const {user_1Id, user_2Id} = createChatDto
    if(user_1Id === user_2Id){
      throw new BadRequestException("Bir xil idga ruxsat yoq")
    }
    const u1 = await this.userSchema.findById(user_1Id)
    if(!u1){
      throw new NotFoundException("Bunday id mavjud emas")
    }
    const u2 = await this.userSchema.findById(user_2Id);
    if (!u2) {
      throw new NotFoundException("Bunday id mavjud emas");
    }
    const newChat = await this.chatSchema.create(createChatDto)
    u1.chats.push(newChat)
    u2.chats.push(newChat)
    await u1.save()
    await u2.save();
    return newChat
  }

  async findAll() {
    const all = await this.chatSchema.find().populate(["user_1Id, user_2Id"]);
    return all
  }

  async findOne(id: string) {
    const one = await this.chatSchema
      .findById(id)
      .populate(["user_1Id, user_2Id"]);
      return one
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    let user1, user2
    const verify = await this.findOne(id)
    if(!verify){
      throw new NotFoundException("Bunday id yoq")
    }
    if(updateChatDto.user_1Id === updateChatDto.user_2Id){
      throw new BadRequestException("Id lar teng bolishi mumkun emas")
    }
    if(verify.user_1Id.toString() != updateChatDto.user_1Id){
      const u1 = await this.userSchema.findById(updateChatDto.user_1Id);
      if (!u1) {
        throw new NotFoundException("Bunday id mavjud emas");
      }
      user1 = u1
    }
    if (verify.user_2Id.toString() != updateChatDto.user_2Id) {
      const u2 = await this.userSchema.findById(updateChatDto.user_2Id);
      if (!u2) {
        throw new NotFoundException("Bunday id mavjud emas");
      }
      user2 = u2
    }
    const updateChat = await this.chatSchema.findByIdAndUpdate(id, updateChatDto)
    user1.chats.push(updateChat)
    user2.chats.push(updateChat);
    return updateChat
  }

  async remove(id: string) {
    const verify = await this.findOne(id);
    if (!verify) {
      throw new NotFoundException("Bunday id yoq");
    }
    const del = await this.chatSchema.findByIdAndDelete(id)
    return {date: del, message:"Maumot ochrildi"}
  }
}
