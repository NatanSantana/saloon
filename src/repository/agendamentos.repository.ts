import { AgendamentoDTO } from "../dto/create-agendamento.dto.js";
import { PrismaService } from "../prisma/prismaService.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AgendamentoRepository {
    constructor(private prismaService: PrismaService) {

    }

    marcarAgendamento(dto: AgendamentoDTO) {
        return this.prismaService.agendamentos.create({
            data: dto
        })
    }

    desmarcarAgendamento(idAgendamento: number) {
        return this.prismaService.agendamentos.delete({
            where: {
                idAgendamento: idAgendamento
            }
        })
    }

    

}