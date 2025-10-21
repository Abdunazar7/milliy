import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ChenelUser } from "./schema/chanel-user.schema";
import { Model } from "mongoose";
import { CreateChenelUserDto } from "./dto/create-chanel-user.dto";
import { UpdateChenelUserDto } from "./dto/update-chanel-user.dto";

@Injectable()
export class ChenelUserService {
  constructor(
    @InjectModel(ChenelUser.name)
    private readonly chenelUserModel: Model<ChenelUser>
  ) {}

  create(createChenelUserDto: CreateChenelUserDto) {
    return this.chenelUserModel.create(createChenelUserDto);
  }

  findAll() {
    return this.chenelUserModel.find().populate("chenelId").populate("userId");
  }

  findOne(id: string) {
    return this.chenelUserModel
      .findById(id)
      .populate("chenelId")
      .populate("userId");
  }

  update(id: string, updateChenelUserDto: UpdateChenelUserDto) {
    return this.chenelUserModel.findByIdAndUpdate(id, updateChenelUserDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.chenelUserModel.findByIdAndDelete(id);
  }
}
