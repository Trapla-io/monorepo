import { Module } from '@nestjs/common';
import { TravelBooksModule } from './travel-books/travel-books.module';
import { PdfModule } from './pdf/pdf.module';
import { CloudStorageModule } from './cloud-storage/cloud-storage.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TravelBooksModule,
    PdfModule,
    CloudStorageModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    CustomersModule,
    ImagesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
