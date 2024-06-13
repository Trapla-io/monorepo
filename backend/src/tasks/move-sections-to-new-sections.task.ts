import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const prisma = application.get(PrismaService);

  try {
    const travelBooks = await prisma.travelBook.findMany();

    for (const travelBook of travelBooks) {
      for (const section of travelBook.sections) {
        const newSection = await prisma.section.create({
          data: {
            title: (section as any).title,
            tag: (section as any).tag,
            items: (section as any).items,
            label: (section as any).label,
            cover_image: (section as any).cover_image,
            icon: (section as any).icon,
            travel_book: {
              connect: {
                id: travelBook.id,
              },
            },
          },
        });
        console.log('Created new section:', newSection);
      }
    }
  } catch (error) {
    throw error;
  }

  await application.close();
  process.exit(0);
}

bootstrap();
