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

export enum EVehicleType {
  car = "car",
  motorcycle = "motorcycle",
  transport = "transport",
}

export enum ETicketStatus {
  open = "open",
  canceled = "canceled",
  closed = "closed",
  finished = "finished",
}

export enum EPaymentType {
  pix = "pix",
  cash = "cash",
  card = "card",
}

export enum EPriceTable {
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
    enum: EVehicleType,
    description: "Type of vehicle",
    default: EVehicleType.car,
  })
  @IsEnum(EVehicleType)
  @IsNotEmpty()
  vehicleType: EVehicleType;

  @ApiProperty({
    enum: ETicketStatus,
    description: "Status of the ticket",
    default: ETicketStatus.open,
  })
  @IsEnum(ETicketStatus)
  @IsNotEmpty()
  status: ETicketStatus;

  @ApiPropertyOptional({
    enum: EPaymentType,
    description: "Type of payment",
  })
  @IsEnum(EPaymentType)
  @IsOptional()
  paymentType?: EPaymentType;

  @ApiProperty({
    enum: EPriceTable,
    description: "Price table to be used",
  })
  @IsEnum(EPriceTable)
  @IsNotEmpty()
  priceTable: EPriceTable;

  @ApiProperty({
    description: "Check-in date and time",
    default: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  checkin?: Date;

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

  @ApiProperty({
    description: "Parking Id",
  })
  @Type(() => String)
  @IsString()
  parkingId: string;
}
