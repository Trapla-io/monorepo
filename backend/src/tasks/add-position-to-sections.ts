import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const prisma = application.get(PrismaService);

  try {
    const travelBooks = await prisma.travelBook.findMany({
      include: { sections: true },
    });

    for (const travelBook of travelBooks) {
      const sortedSections = travelBook.sections.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      for (let i = 0; i < sortedSections.length; i++) {
        await prisma.section.update({
          where: { id: sortedSections[i].id },
          data: { position: i },
        });
      }
    }
  } catch (error) {
    throw error;
  }

  await application.close();
  process.exit(0);
}

bootstrap();
