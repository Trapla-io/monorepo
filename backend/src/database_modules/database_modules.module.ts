import { Module } from '@nestjs/common';
import { DatabaseModulesService } from './database_modules.service';
import { DatabaseModulesController } from './database_modules.controller';

@Module({
  controllers: [DatabaseModulesController],
  providers: [DatabaseModulesService],
})
export class DatabaseModulesModule {}
