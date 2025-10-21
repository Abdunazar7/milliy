import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userSchema.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 7),
    });
  }

  findAll() {
    return this.userSchema.find();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");
    return this.userSchema.findById(id);
  }

  findUserByEmail(email: string) {
    return this.userSchema.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");
    return this.userSchema.findByIdAndUpdate(id, updateUserDto); // return updated object
    // return this.userSchema.updateOne({ _id: id }); return affected rows and fignya kakayato
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException("ID notogri");

    return this.userSchema.findByIdAndDelete(id); // return deleted object
    // return this.userSchema.deleteOne({ _id: id }); return affected rows and fignya kakayato
  }
}
