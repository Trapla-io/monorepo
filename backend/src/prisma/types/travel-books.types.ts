import { Prisma } from '@prisma/client';

const TravelBookWithCustomer = Prisma.validator<Prisma.TravelBookDefaultArgs>()(
  {
    include: { customer: true },
  },
);

export type TravelBookWithCustomer = Prisma.TravelBookGetPayload<
  typeof TravelBookWithCustomer
>;
