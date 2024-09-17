import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@GetUser() user: User, @Body() dto: CreateTagDto) {
    return this.tagsService.create(user, dto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tagsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @GetUser() user: User, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(user, +id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tagsService.remove(user, +id);
  }
}
