import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { User } from '@prisma/client';
import { CloudStorageService } from 'src/cloud-storage/cloud-storage.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private cloudStorageService: CloudStorageService, private prisma: PrismaService) {}

  async create(user: User, image) {
    try {
      const s3Image = await this.cloudStorageService.uploadFile(image);

      return await this.prisma.image.create({
        data: {
          url: s3Image.Location,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  async findAllByUser(user: User) {
    try {
      return await this.prisma.image.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
