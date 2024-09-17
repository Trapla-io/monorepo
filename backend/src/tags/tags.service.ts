import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateTagDto) {
    try {
      return await this.prisma.tag.create({
        data: {
          ...dto,
          color: dto.color || '#e0e0e0',
          user_id: user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(user: User) {
    try {
      return await this.prisma.tag.findMany({
        where: {
          user_id: user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  async update(user: User, id: number, updateTagDto: UpdateTagDto) {
    try {
      return await this.prisma.tag.update({
        where: {
          id,
          user_id: user.id,
        },
        data: updateTagDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Tag not found');
      } else {
        throw error;
      }
    }
  }

  async remove(user: User, id: number) {
    try {
      await this.prisma.tag.delete({
        where: {
          id,
          user_id: user.id,
        },
      });
      return 'Tag deleted successfully';
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Tag not found');
      } else {
        throw error;
      }
    }
  }
}
