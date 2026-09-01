import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService.js";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";

@Injectable()
export class EstabelecimentoRepository {

    findByCnpj(cnpj: string) {
        return PrismaService.estabelecimento.findUnique({
            where: {
                cnpj: cnpj
            }
        })
    }


    cadastrarEstabelecimento(dto: EstabelecimentoDto) {
    return PrismaService.estabelecimento.create({
        data: {
            User: { connect: { idUser: dto.dono } },
            nome: dto.nome,
            cnpj: dto.cnpj,
            Endereco: {
                create: {
                    cep: dto.endereco.cep,
                    cidade: dto.endereco.cidade,
                    bairro: dto.endereco.bairro,
                    rua: dto.endereco.rua
                }
            }
        },
        include: {
            Endereco: true
        }
    })
}

    deletarEstabelecimento(cnpj: string, dono: number) {
        return PrismaService.estabelecimento
    }


}