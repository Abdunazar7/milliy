import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Region } from "../../region/entities/region.entity";

export type DistrictDocument = HydratedDocument<District>;

@Schema({ versionKey: false })
export class District {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: "Region" })
  regionId: Region;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
