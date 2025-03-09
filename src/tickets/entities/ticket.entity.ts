import { Ticket as PrismaTicket } from "@prisma/client";

export class Ticket implements PrismaTicket {
  id: string;
  plate: string;
  vehicleType: "car" | "motorcycle" | "transport";
  status: "open" | "canceled" | "closed" | "paid";
  paymentType: "pix" | "cash" | "card" | null;
  priceTable: "hourly" | "diarist" | "monthly";
  checkin: Date;
  checkout: Date | null;
  discount: number | null;
  total: number | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
