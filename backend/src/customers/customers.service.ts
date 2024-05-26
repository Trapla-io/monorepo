import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto, user: User) {
    try {
      return this.prisma.customer.create({
        data: {
          ...createCustomerDto,
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
    return `This action returns all customers`;
  }

  async findAllByUser(user: User) {
    try {
      return await this.prisma.customer.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          travel_books: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.customer.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  update(user: User, id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.prisma.customer.update({
        where: {
          id: id,
          user_id: user.id,
        },
        data: {
          ...updateCustomerDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
