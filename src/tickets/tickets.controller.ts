import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
} from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { IHeaders } from "src/types/common";

@ApiTags("tickets")
@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new ticket" })
  @ApiResponse({
    status: 201,
    description: "The ticket has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tickets" })
  @ApiResponse({ status: 200, description: "Return all tickets." })
  @ApiQuery({
    name: "status",
    required: false,
    description: "Filter by status",
  })
  @ApiQuery({
    name: "vehicleType",
    required: false,
    description: "Filter by vehicle type",
  })
  findAll(
    @Headers() headers: IHeaders,
    @Query("status") status?: "open" | "canceled" | "closed" | "finished",
    @Query("vehicleType") vehicleType?: "car" | "motorcycle" | "transport",
    @Query("plate") plate?: string
  ) {
    return this.ticketsService.findAll({
      parkingId: headers["profile-id"],
      status,
      vehicleType,
      plate,
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a ticket by id" })
  @ApiResponse({ status: 200, description: "Return the ticket." })
  @ApiResponse({ status: 404, description: "Ticket not found." })
  @ApiParam({ name: "id", description: "Ticket ID" })
  findOne(@Param("id") id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a ticket" })
  @ApiResponse({
    status: 200,
    description: "The ticket has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Ticket not found." })
  @ApiParam({ name: "id", description: "Ticket ID" })
  update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a ticket" })
  @ApiResponse({
    status: 200,
    description: "The ticket has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Ticket not found." })
  @ApiParam({ name: "id", description: "Ticket ID" })
  remove(@Param("id") id: string) {
    return this.ticketsService.remove(id);
  }
}
