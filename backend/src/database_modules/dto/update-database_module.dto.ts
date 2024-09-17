import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseModuleDto } from './create-database_module.dto';

export class UpdateDatabaseModuleDto extends PartialType(CreateDatabaseModuleDto) {}
