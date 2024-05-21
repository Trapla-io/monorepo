import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudStorageModule } from 'src/cloud-storage/cloud-storage.module';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [CloudStorageModule],
})
export class ImagesModule {}
