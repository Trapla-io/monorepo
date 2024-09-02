import { Injectable } from '@nestjs/common';
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
            connect: dto.tag_ids.map((id) => ({ id })),
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

  update(id: number, updateDatabaseModuleDto: UpdateDatabaseModuleDto) {
    return `This action updates a #${id} databaseModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} databaseModule`;
  }
}
