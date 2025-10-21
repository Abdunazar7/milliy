import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChenelService } from "./chenel.service";
import { ChenelController } from "./chenel.controller";
import { Chenel, ChenelSchema } from "./schema/chenel.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chenel.name, schema: ChenelSchema }]),
  ],
  controllers: [ChenelController],
  providers: [ChenelService],
  exports: [ChenelService],
})
export class ChenelModule {}
