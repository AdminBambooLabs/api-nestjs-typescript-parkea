import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DiaristPrices, HourlyPrices, MonthlyPrices } from "@prisma/client";

export class CreateParkingLotDto {
  @ApiProperty({ description: "Parking lot register email" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Parking lot name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Parking lot document (e.g., CNPJ)" })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: "Parking lot contact (e.g., phone)" })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ description: "Street name" })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: "Street number" })
  @IsInt()
  @IsNotEmpty()
  streetNumber: number;

  @ApiProperty({ description: "City name" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: "State abbreviation (e.g., SP)" })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: "ZIP code" })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: "Weekday opening time (e.g., 08:00)" })
  @IsString()
  @IsOptional()
  weekdayOpen: string;

  @ApiProperty({ description: "Weekday closing time (e.g., 18:00)" })
  @IsString()
  @IsOptional()
  weekdayClose: string;

  @ApiProperty({ description: "Weekend opening time (e.g., 09:00)" })
  @IsString()
  @IsOptional()
  weekendOpen: string;

  @ApiProperty({ description: "Weekend closing time (e.g., 17:00)" })
  @IsString()
  @IsOptional()
  weekendClose: string;

  // Relations

  @ApiProperty({
    description: "Hourly prices",
    required: false,
    type: Object,
  })
  @IsOptional()
  hourlyPrices?: HourlyPrices; // ou um DTO específico como HourlyPriceDto[]

  @ApiProperty({
    description: "Diarist prices",
    required: false,
    type: Object,
  })
  @IsOptional()
  diaristPrices?: DiaristPrices;

  @ApiProperty({
    description: "Monthly prices",
    required: false,
    type: Object,
  })
  @IsOptional()
  monthlyPrices?: MonthlyPrices;
}
