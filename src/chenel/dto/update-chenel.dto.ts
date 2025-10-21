import { PartialType } from '@nestjs/mapped-types';
import { CreateChenelDto } from './create-chenel.dto';

export class UpdateChenelDto extends PartialType(CreateChenelDto) {}
