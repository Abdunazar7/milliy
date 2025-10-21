import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class GroupService {
    constructor(
      @InjectModel(Group.name) private readonly groupSchema: Model<Group>
    ) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupSchema.create(createGroupDto);
  }

  findAll() {
    return this.groupSchema.find().populate("group_users");
  }

  findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new BadRequestException("ID noto'g'ri");
        }
    return this.groupSchema.findById(id).populate("group_users");
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new BadRequestException("ID noto'g'ri");
            }
    return this.groupSchema.findByIdAndUpdate(id, updateGroupDto);
  }

  remove(id: string) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new BadRequestException("ID noto'g'ri");
            }
    return this.groupSchema.findByIdAndDelete(id);
  }
}
