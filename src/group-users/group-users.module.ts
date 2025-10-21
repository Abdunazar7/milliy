import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupUser, GroupUserSchema } from "./schemas/group-user.schema";
import { GroupUsersService } from "./group-users.service";
import { GroupUsersController } from "./group-users.controller";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Group, GroupSchema } from "../group/schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupUser.name,
        schema: GroupUserSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
  ],
  controllers: [GroupUsersController],
  providers: [GroupUsersService],
})
export class GroupUserModule {}
