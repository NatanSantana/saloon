import { Module } from "@nestjs/common";
import { AgendamentoService } from "../service/agendamento.service.js";
import { AgendamentoRepository } from "../repository/agendamentos.repository.js";
import { HorariosRepository } from "../repository/horarios.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { AgendamentoController } from "../controller/agendamento.controller.js";
import { PrismaService } from "../prisma/prismaService.js";

@Module({
    imports: [],
    providers: [PrismaService, AgendamentoService, AgendamentoRepository, HorariosRepository, UserRepository],
    controllers: [AgendamentoController],
    exports: []
})
export class AgendamentoModule {}