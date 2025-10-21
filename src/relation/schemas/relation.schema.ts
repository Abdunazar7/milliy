import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type RelationDocument = HydratedDocument<Relation>;

@Schema({ versionKey: false, timestamps: true })
export class Relation {
  @Prop()
  name:string
  
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "user",
  })
  user_1Id: User;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "user",
  })
  user_2Id: User;
}

export const RelationSchema = SchemaFactory.createForClass(Relation);
