import { Module } from "@nestjs/common";
import { HorarioService } from "../service/horario.service.js";
import { HorariosRepository } from "../repository/horarios.repository.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";
import { HorariosController } from "../controller/horarios.controller.js";
import { PrismaService } from "../prisma/prismaService.js";

@Module({
    imports: [],
    providers: [PrismaService, HorarioService, HorariosRepository, EstabelecimentoRepository, ColaboradorRepository],
    controllers: [HorariosController],
    exports: []
})
export class HorarioModule {} 