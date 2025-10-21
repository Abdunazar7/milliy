import { PartialType } from "@nestjs/mapped-types";
import { CreateChenelUserDto } from "./create-chanel-user.dto";

export class UpdateChenelUserDto extends PartialType(CreateChenelUserDto) {}
