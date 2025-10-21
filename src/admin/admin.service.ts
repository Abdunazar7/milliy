import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    return this.adminSchema.create({
      ...createAdminDto,
      password: await bcrypt.hash(createAdminDto.password, 7),
    });
  }

  findAll() {
    return this.adminSchema.find();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");
    return this.adminSchema.findById(id);
  }

  findAdminByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto); // return updated object
    // return this.adminSchema.updateOne({ _id: id }); return affected rows and fignya kakayato
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");

    return this.adminSchema.findByIdAndDelete(id); // return deleted object
    // return this.adminSchema.deleteOne({ _id: id }); return affected rows and fignya kakayato
  }
}
