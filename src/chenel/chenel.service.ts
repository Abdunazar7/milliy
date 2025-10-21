import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chenel } from "./schema/chenel.schema";
import { Model } from "mongoose";
import { CreateChenelDto } from "./dto/create-chenel.dto";
import { UpdateChenelDto } from "./dto/update-chenel.dto";

@Injectable()
export class ChenelService {
  constructor(
    @InjectModel(Chenel.name) private readonly chenelModel: Model<Chenel>
  ) {}

  create(createChenelDto: CreateChenelDto) {
    return this.chenelModel.create(createChenelDto);
  }

  findAll() {
    return this.chenelModel.find().populate("ownerId");
  }

  findOne(id: string) {
    return this.chenelModel.findById(id).populate("ownerId");
  }

  update(id: string, updateChenelDto: UpdateChenelDto) {
    return this.chenelModel.findByIdAndUpdate(id, updateChenelDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.chenelModel.findByIdAndDelete(id);
  }
}
