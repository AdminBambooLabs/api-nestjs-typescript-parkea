import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateParkingLotDto } from "./dto/create-parking-lot.dto";
import { UpdateParkingLotDto } from "./dto/update-parking-lot.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ParkingLotService {
  constructor(private prisma: PrismaService) {}

  async create(createParkingLotDto: CreateParkingLotDto) {
    const { hourlyPrices, diaristPrices, monthlyPrices, ...rest } =
      createParkingLotDto;

    try {
      return this.prisma.parking.create({
        data: {
          ...rest,
          hourlyPrices: hourlyPrices ? { create: hourlyPrices } : undefined,
          diaristPrices: diaristPrices ? { create: diaristPrices } : undefined,
          monthlyPrices: monthlyPrices ? { create: monthlyPrices } : undefined,
        },
        include: {
          hourlyPrices: hourlyPrices ? true : undefined,
          diaristPrices: diaristPrices ? true : undefined,
          monthlyPrices: monthlyPrices ? true : undefined,
        },
      });
    } catch (error) {
      console.error("Error creating parking lot:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.parking.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          hourlyPrices: true,
          diaristPrices: true,
          monthlyPrices: true,
        },
      });
    } catch (error) {
      console.error("Error finding parking lots:", error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const parkingLot = await this.prisma.parking.findFirst({
        where: { OR: [{ cognitoId: id }, { id }] },
        include: {
          hourlyPrices: true,
          diaristPrices: true,
          monthlyPrices: true,
        },
      });

      if (!parkingLot) {
        throw new NotFoundException(`Parking lot with ID ${id} not found`);
      }

      return parkingLot;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error finding parking lot with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, updateParkingLotDto: UpdateParkingLotDto) {
    const { hourlyPrices, diaristPrices, monthlyPrices, ...rest } =
      updateParkingLotDto;

    try {
      return await this.prisma.parking.update({
        where: { id },
        data: {
          ...rest,
          hourlyPrices: hourlyPrices
            ? {
                upsert: {
                  where: { parkingId: id },
                  update: hourlyPrices,
                  create: hourlyPrices,
                },
              }
            : undefined,
          diaristPrices: diaristPrices
            ? {
                upsert: {
                  where: { parkingId: id },
                  update: diaristPrices,
                  create: diaristPrices,
                },
              }
            : undefined,
          monthlyPrices: monthlyPrices
            ? {
                upsert: {
                  where: { parkingId: id },
                  update: monthlyPrices,
                  create: monthlyPrices,
                },
              }
            : undefined,
        },
        include: {
          hourlyPrices: true,
          diaristPrices: true,
          monthlyPrices: true,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Parking lot with ID ${id} not found`);
      }
      console.error(`Error updating Parking lot with ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.parking.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Parking lot with ID ${id} not found`);
      }
      console.error(`Error deleting parking lot with ID ${id}:`, error);
      throw error;
    }
  }
}
