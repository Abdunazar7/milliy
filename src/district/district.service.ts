import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "../region/entities/region.entity";
import { Model } from "mongoose";
import { District } from "./schemas/district.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>,
    @InjectModel(District.name) private readonly districtSchema: Model<District>
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const regionId = createDistrictDto.regionId;

    const region = await this.regionSchema.findById(regionId);

    if (!region) {
      throw new NotFoundException("Bunday viloyat topilmadi");
    }

    const district = await this.districtSchema.create(createDistrictDto);

    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("regionId");
  }

  findOne(id: string) {
    return this.districtSchema.findById(id).populate("regionId");
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: string) {
    return `This action removes a #${id} district`;
  }
}
