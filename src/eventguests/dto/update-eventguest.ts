import { PartialType } from "@nestjs/mapped-types";
import { CreateEventguestDto } from "./create-eventguest";

export class UpdateEventguestDto extends PartialType(CreateEventguestDto) {}
