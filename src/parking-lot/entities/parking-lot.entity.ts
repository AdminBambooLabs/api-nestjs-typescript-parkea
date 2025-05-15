import {
  DiaristPrices,
  HourlyPrices,
  MonthlyPrices,
  Parking as PrismaParking,
} from "@prisma/client";

export class Parking implements PrismaParking {
  id: string;
  cognitoId: string;
  email: string;
  name: string;
  document: string;
  contact: string;
  street: string;
  streetNumber: number;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;

  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;

  hourlyPrices?: HourlyPrices;
  diaristPrices?: DiaristPrices;
  monthlyPrices?: MonthlyPrices;
}
