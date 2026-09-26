import { Module } from "@nestjs/common";
import { ColaboradorService } from "../service/colaborador.service.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";
import { ColaboradorController } from "../controller/colaborador.controller.js";
import { UserRepository } from "../repository/user.repository.js";
import { PrismaService } from "../prisma/prismaService.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";

@Module({
    imports: [
        
    ],
    providers: [PrismaService, ColaboradorService, ColaboradorRepository, UserRepository, EstabelecimentoRepository],
    controllers: [ColaboradorController],
    exports: []
})
export class ColaboradorModule {}