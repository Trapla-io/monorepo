import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelBookmarkDto } from './create-travel_bookmark.dto';

export class UpdateTravelBookmarkDto extends PartialType(CreateTravelBookmarkDto) {}
