import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const prisma = application.get(PrismaService);

  try {
    const sections = await prisma.section.findMany({
      where: {
        OR: [
          { tag: 'useful-informations' },
          { tag: 'check-list' },
          { tag: 'itinerary' },
          { tag: 'accommodations' },
          { tag: 'transports' },
        ],
      },
    });
    for (const section of sections) {
      section.items = {
        list: Object.values(section.items)[0],
      };
      await prisma.section.update({
        where: { id: section.id },
        data: { items: section.items },
      });
      console.log(`Updated section with id: ${section.id}`);
    }
  } catch (error) {
    throw error;
  }

  await application.close();
  process.exit(0);
}

bootstrap();
