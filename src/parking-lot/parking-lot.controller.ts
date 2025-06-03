import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ParkingLotService } from "./parking-lot.service";
import { CreateParkingLotDto } from "./dto/create-parking-lot.dto";
import { UpdateParkingLotDto } from "./dto/update-parking-lot.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("parking-lot")
@Controller("parking-lot")
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Post()
  @ApiOperation({ summary: "Create a new parking lot" })
  @ApiResponse({
    status: 201,
    description: "The parking lot has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createParkignLotDto: CreateParkingLotDto) {
    return this.parkingLotService.create(createParkignLotDto);
  }

  // @Get()
  // @ApiOperation({ summary: "Get all parking lots" })
  // @ApiResponse({ status: 200, description: "Return all parking lots." })
  // findAll() {
  //   return this.parkingLotService.findAll();
  // }

  @Get(":id")
  @ApiOperation({ summary: "Get a parking lot by id" })
  @ApiResponse({ status: 200, description: "Return the parking lot." })
  @ApiResponse({ status: 404, description: "Parking lot not found." })
  @ApiParam({ name: "id", description: "Parking lot ID" })
  findOne(@Param("id") id: string) {
    return this.parkingLotService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a parking lot" })
  @ApiResponse({
    status: 200,
    description: "The parking lot has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Parking lot not found." })
  @ApiParam({ name: "id", description: "Parking lot ID" })
  update(
    @Param("id") id: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto
  ) {
    return this.parkingLotService.update(id, updateParkingLotDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a parking lot" })
  @ApiResponse({
    status: 200,
    description: "The parking lot has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Parking lot not found." })
  @ApiParam({ name: "id", description: "Parking lot ID" })
  remove(@Param("id") id: string) {
    return this.parkingLotService.remove(id);
  }
}
