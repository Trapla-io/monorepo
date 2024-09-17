import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { DatabaseModulesService } from './database_modules.service';
import { CreateDatabaseModuleDto } from './dto/create-database_module.dto';
import { UpdateDatabaseModuleDto } from './dto/update-database_module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { SyncDatabaseModuleDto } from './dto/sync-database_module.dto';

@UseGuards(JwtAuthGuard)
@Controller('database-modules')
export class DatabaseModulesController {
  constructor(private readonly databaseModulesService: DatabaseModulesService) {}

  @Post()
  create(@GetUser() user: User, @Body() dto: CreateDatabaseModuleDto) {
    return this.databaseModulesService.create(user, dto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.databaseModulesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseModulesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @GetUser() user: User, @Body() dto: UpdateDatabaseModuleDto) {
    return this.databaseModulesService.update(+id, user, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.databaseModulesService.remove(+id, user);
  }

  @Post('sync')
  sync(@GetUser() user: User, @Body() dto: SyncDatabaseModuleDto) {
    return this.databaseModulesService.sync(user, dto);
  }
}
