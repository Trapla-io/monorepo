import { Injectable } from '@nestjs/common';
import { CreateTravelBookmarkDto } from './dto/create-travel_bookmark.dto';
import { UpdateTravelBookmarkDto } from './dto/update-travel_bookmark.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TravelBookmarksService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, dto: CreateTravelBookmarkDto) {
    try {
      return await this.prisma.travelBookmark.create({
        data: {
          ...dto,
          user: {
            connect: {
              id: user.id,
            },
          },
          tags: {
            connect: dto.tags?.map(tag => ({ id: tag.id })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all travelBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelBookmark`;
  }

  update(id: number, updateTravelBookmarkDto: UpdateTravelBookmarkDto) {
    return `This action updates a #${id} travelBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelBookmark`;
  }
}
