import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ChenelUserService } from "./chanel-user.service";
import { CreateChenelUserDto } from "./dto/create-chanel-user.dto";
import { UpdateChenelUserDto } from "./dto/update-chanel-user.dto";

@Controller("chenel-users")
export class ChenelUserController {
  constructor(private readonly chenelUserService: ChenelUserService) {}

  @Post()
  create(@Body() createChenelUserDto: CreateChenelUserDto) {
    return this.chenelUserService.create(createChenelUserDto);
  }

  @Get()
  findAll() {
    return this.chenelUserService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chenelUserService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateChenelUserDto: UpdateChenelUserDto
  ) {
    return this.chenelUserService.update(id, updateChenelUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chenelUserService.remove(id);
  }
}
