import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatabaseModuleDto } from './dto/create-database_module.dto';
import { UpdateDatabaseModuleDto } from './dto/update-database_module.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SyncDatabaseModuleDto } from './dto/sync-database_module.dto';

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

  async sync(user: User, dto: SyncDatabaseModuleDto) {
    try {
      const sections = await this.prisma.section.findMany({
        where: {
          OR: [
            { tag: 'useful-informations' },
            { tag: 'check-list' },
            { tag: 'itinerary' },
            { tag: 'accommodations' },
            { tag: 'transports' },
          ],
          travel_book: {
            user_id: user.id,
          },
        },
      });

      for (const section of sections as any) {
        if (section.items.list.find(e => e.module_id === dto.id)) {
          const newItemsList = section.items.list.map(e => {
            if (e.module_id === dto.id) {
              return { ...dto.content, module_id: dto.id };
            }
            return e;
          });

          await this.prisma.section.update({
            where: { id: section.id },
            data: {
              items: {
                ...section.items,
                list: newItemsList,
              },
            },
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
