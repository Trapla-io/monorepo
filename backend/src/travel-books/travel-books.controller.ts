import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TravelBooksService } from './travel-books.service';
import { CreateTravelBookDto } from './dto/create-travel-book.dto';
import { UpdateTravelBookDto } from './dto/update-travel-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('travel-books')
export class TravelBooksController {
  constructor(private readonly travelBooksService: TravelBooksService) {}

  @Post()
  create(@GetUser() user: User, @Body() createTravelBookDto: CreateTravelBookDto) {
    return this.travelBooksService.create(createTravelBookDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.travelBooksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelBooksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTravelBookDto: UpdateTravelBookDto,
  ) {
    return this.travelBooksService.update(+id, updateTravelBookDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelBooksService.remove(+id);
  }

  @Post(':id/export')
  export(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('data') data: object,
  ) {
    return this.travelBooksService.export(+id, data, user);
  }

  @Post(':id/preview')
  preview(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('data') data: object,
  ) {
    return this.travelBooksService.preview(+id, data, user);
  }
}
