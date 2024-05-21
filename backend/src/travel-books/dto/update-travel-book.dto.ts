import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelBookDto } from './create-travel-book.dto';

export class UpdateTravelBookDto extends PartialType(CreateTravelBookDto) {}
