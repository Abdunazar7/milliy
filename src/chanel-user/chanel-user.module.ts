import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChenelUserService } from "./chanel-user.service";
import { ChenelUserController } from "./chanel-user.controller";
import { ChenelUser, ChenelUserSchema } from "./schema/chanel-user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChenelUser.name, schema: ChenelUserSchema },
    ]),
  ],
  controllers: [ChenelUserController],
  providers: [ChenelUserService],
  exports: [ChenelUserService],
})
export class ChenelUserModule {}
