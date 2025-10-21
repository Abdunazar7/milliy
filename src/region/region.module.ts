import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegionService } from "./region.service";
import { RegionController } from "./region.controller";
import { Region, RegionSchema } from "./entities/region.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
