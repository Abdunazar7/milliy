import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RelationService } from "./relation.service";
import { CreateRelationDto } from "./dto/create-relation.dto";
import { UpdateRelationDto } from "./dto/update-relation.dto";

@Controller("relation")
export class RelationController {
  constructor(private readonly RelationService: RelationService) {}

  @Post()
  create(@Body() createRelationDto: CreateRelationDto) {
    return this.RelationService.create(createRelationDto);
  }

  @Get()
  findAll() {
    return this.RelationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.RelationService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRelationDto: UpdateRelationDto) {
    return this.RelationService.update(id, updateRelationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.RelationService.remove(id);
  }
}
