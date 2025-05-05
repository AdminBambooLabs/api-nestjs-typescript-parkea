import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TicketsModule } from "./tickets/tickets.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ParkingLotModule } from "./parking-lot/parking-lot.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TicketsModule,
    ParkingLotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
