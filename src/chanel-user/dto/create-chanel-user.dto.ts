import { IsNotEmpty, IsString } from "class-validator";

export class CreateChenelUserDto {
  @IsNotEmpty()
  @IsString()
  chenelId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
