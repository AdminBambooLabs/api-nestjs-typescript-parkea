import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TicketsModule } from "./tickets/tickets.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
