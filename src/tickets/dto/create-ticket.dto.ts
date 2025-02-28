import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum VehicleType {
  car = "car",
  motorcycle = "motorcycle",
  transport = "transport",
}

enum TicketStatus {
  open = "open",
  canceled = "canceled",
  closed = "closed",
  paid = "paid",
}

enum PaymentType {
  pix = "pix",
  cash = "cash",
  card = "card",
}

enum PriceTable {
  hourly = "hourly",
  diarist = "diarist",
  monthly = "monthly",
}

export class CreateTicketDto {
  @ApiProperty({ description: "Vehicle plate number" })
  @IsString()
  @IsNotEmpty()
  plate: string;

  @ApiProperty({
    enum: VehicleType,
    description: "Type of vehicle",
    default: VehicleType.car,
  })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

  @ApiProperty({
    enum: TicketStatus,
    description: "Status of the ticket",
    default: TicketStatus.open,
  })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;

  @ApiPropertyOptional({
    enum: PaymentType,
    description: "Type of payment",
  })
  @IsEnum(PaymentType)
  @IsOptional()
  paymentType?: PaymentType;

  @ApiProperty({
    enum: PriceTable,
    description: "Price table to be used",
  })
  @IsEnum(PriceTable)
  @IsNotEmpty()
  priceTable: PriceTable;

  @ApiProperty({
    description: "Check-in date and time",
    default: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  checkin: Date;

  @ApiPropertyOptional({
    description: "Check-out date and time",
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  checkout?: Date;

  @ApiPropertyOptional({
    description: "Discount amount",
  })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({
    description: "Total amount",
  })
  @IsNumber()
  @IsOptional()
  total?: number;
}
