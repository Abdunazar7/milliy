import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupUserDto } from "./dto/create-group-user.dto";
import { UpdateGroupUserDto } from "./dto/update-group-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GroupUser } from "./schemas/group-user.schema";
import { Group } from "../group/schemas/group.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectModel(GroupUser.name)
    private readonly groupuserSchema: Model<GroupUser>,
    @InjectModel(Group.name) private readonly groupSchema: Model<Group>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) {}

  async create(createGroupUserDto: CreateGroupUserDto) {
    const userId = createGroupUserDto.userId;
    const groupId = createGroupUserDto.groupId;
    const user = await this.userSchema.findById(userId);
    const group = await this.groupSchema.findById(groupId);
    if(!user && !group) {
      throw new NotFoundException("User or group not found!")
    }
    const groupUser = await this.groupuserSchema.create(createGroupUserDto);
    group?.group_users.push(groupUser);
    await group?.save();
    user?.group_users.push(groupUser);
    await user?.save()
    return groupUser;
  }

  findAll() {
    return this.groupuserSchema.find().populate("userId", "groupId");
  }

  findOne(id: string) {
    return this.groupuserSchema.findById(id).populate("userId", "groupId");
  }

  update(id: string, updateGroupUserDto: UpdateGroupUserDto) {
    return this.groupuserSchema.findByIdAndUpdate(id, updateGroupUserDto);
  }

  remove(id: string) {
    return this.groupuserSchema.findByIdAndDelete(id);
  }
}
