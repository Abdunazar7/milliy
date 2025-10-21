import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Relation, RelationSchema } from "./schemas/relation.schema";
import { User, UserSchema } from "../user/schemas/user.schema";
import { RelationController } from "./relation.controller";
import { RelationService } from "./relation.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Relation.name,
        schema: RelationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RelationController],
  providers: [RelationService],
})
export class RelationModule {}
