import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketDto, ETicketStatus } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      return this.prisma.ticket.create({
        data: createTicketDto,
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  async findAll(params: {
    status?: "open" | "canceled" | "closed" | "paid";
    vehicleType?: "car" | "motorcycle" | "transport";
  }) {
    try {
      const { status, vehicleType } = params;
      const where: Prisma.TicketWhereInput = {};

      if (status) {
        where.status = status;
      }

      if (vehicleType) {
        where.vehicleType = vehicleType;
      }

      return this.prisma.ticket.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error finding tickets:", error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id },
      });

      if (!ticket) {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }

      return ticket;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error finding ticket with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      const ticketStatus = updateTicketDto?.status;

      if (ticketStatus === ETicketStatus.closed) {
        updateTicketDto.checkout = new Date();
      }

      return await this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }
      console.error(`Error updating ticket with ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }
      console.error(`Error deleting ticket with ID ${id}:`, error);
      throw error;
    }
  }
}
