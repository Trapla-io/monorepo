import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TravelBookmarksService } from './travel_bookmarks.service';
import { CreateTravelBookmarkDto } from './dto/create-travel_bookmark.dto';
import { UpdateTravelBookmarkDto } from './dto/update-travel_bookmark.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('travel-bookmarks')
export class TravelBookmarksController {
  constructor(private readonly travelBookmarksService: TravelBookmarksService) {}

  @Post()
  create(@GetUser() user: User, @Body() createTravelBookmarkDto: CreateTravelBookmarkDto) {
    return this.travelBookmarksService.create(user, createTravelBookmarkDto);
  }

  @Get()
  findAll() {
    return this.travelBookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelBookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelBookmarkDto: UpdateTravelBookmarkDto) {
    return this.travelBookmarksService.update(+id, updateTravelBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelBookmarksService.remove(+id);
  }
}
