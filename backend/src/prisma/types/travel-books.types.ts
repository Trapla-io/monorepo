import { Prisma } from '@prisma/client';

const TravelBookWithCustomerAndSections =
  Prisma.validator<Prisma.TravelBookDefaultArgs>()({
    include: {
      customer: true,
      sections: true,
    },
  });

export type TravelBookWithCustomerAndSections = Prisma.TravelBookGetPayload<
  typeof TravelBookWithCustomerAndSections
>;
