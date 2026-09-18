import { Injectable } from "@nestjs/common";
import { ColaboradorDto } from "../dto/create-colaborador.dto.js";
import { PrismaService } from "../prisma/prismaService.js";

@Injectable()
export class ColaboradorRepository {

    findById(idColaborador: number) {
        return PrismaService.colaborador.findUnique({
            where: {
                idColaborador: idColaborador
            }
        })
    }

    criarColaborador(dto: ColaboradorDto) {
        return PrismaService.colaborador.create({
            data: dto
        })

    }
    // deleta o registro de colaborador
    deletarColaborador(idColaborador: number) {
        return PrismaService.colaborador.delete({
            where: {
                idColaborador: idColaborador
            }
        })
    }

    // tira o vínculo do colaborador a um estabelecimento
    demitirColaborador(idColaborador: number, idEstabelecimento: number) {
        return PrismaService.colaborador.update({
            data: {
                idEstabelecimento: 0
            }, 
            where: {
                idColaborador: idColaborador,
                idEstabelecimento: idEstabelecimento
            }
        })
    }


}