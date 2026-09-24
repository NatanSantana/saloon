import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService.js";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";


@Injectable()
export class EstabelecimentoRepository {
    constructor(private prismaService: PrismaService) {

    }

    findById(id: number) {
        return this.prismaService.estabelecimento.findUnique({
            where: {
                idEstabelecimento: id
            }
        })
    }

    findByCnpj(cnpj: string) {
        return this.prismaService.estabelecimento.findUnique({
            where: {
                cnpj: cnpj
            }
        })
    }


    cadastrarEstabelecimento(dto: EstabelecimentoDto) {
    return this.prismaService.estabelecimento.create({
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

    findByIdDono(idUser: number) {
        return this.prismaService.estabelecimento.findMany({
            where: {
                dono: idUser
            }
        })
    }

    listarEstabelecimentos() {
        return this.prismaService.estabelecimento.findMany()
    }

    deletarEstabelecimento(cnpj: string, dono: number) {
        return this.prismaService.estabelecimento
    }


}