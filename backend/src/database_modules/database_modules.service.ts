import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatabaseModuleDto } from './dto/create-database_module.dto';
import { UpdateDatabaseModuleDto } from './dto/update-database_module.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateDatabaseModuleDto) {
    try {
      return await this.prisma.databaseModule.create({
        data: {
          title: dto.title,
          content: dto.content,
          type: dto.type,
          user_id: user.id,
          tags: {
            connect: dto.tag_ids?.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(user: User) {
    try {
      return await this.prisma.databaseModule.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          updated_at: 'desc',
        },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} databaseModule`;
  }

  async update(id: number, user: User, dto: UpdateDatabaseModuleDto) {
    try {
      return await this.prisma.databaseModule.update({
        where: {
          id,
          user_id: user.id,
        },
        data: {
          title: dto.title,
          content: dto.content,
          type: dto.type,
          tags: { set: dto.tag_ids?.map((id) => ({ id })) },
        },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException('DatabaseModule not found');
      } else {
        throw error;
      }
    }
  }

  async remove(id: number, user: User) {
    try {
      return await this.prisma.databaseModule.delete({
        where: {
          id,
          user_id: user.id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('DatabaseModule not found');
      } else {
        throw error;
      }
    }
  }
}
