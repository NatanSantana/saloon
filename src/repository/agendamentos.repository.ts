import { PrismaService } from "../prisma/prismaService.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HorariosRepository {
    constructor(private prismaService: PrismaService) {

    }

    marcarAgendamento() {
        
    }

}