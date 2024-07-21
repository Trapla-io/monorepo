import { Module } from '@nestjs/common';
import { TravelBookmarksService } from './travel_bookmarks.service';
import { TravelBookmarksController } from './travel_bookmarks.controller';

@Module({
  controllers: [TravelBookmarksController],
  providers: [TravelBookmarksService],
})
export class TravelBookmarksModule {}
