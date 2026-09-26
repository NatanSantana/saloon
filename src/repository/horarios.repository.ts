import { Injectable } from "@nestjs/common";
import { HorarioDto } from "../dto/create-horario.dto.js";
import { PrismaService } from "../prisma/prismaService.js";
import { addMinutes } from 'date-fns'
import { Prisma } from "../generated/prisma/client.js"

@Injectable()
export class HorariosRepository {
    constructor(private prismaService: PrismaService) {

    }

    desocuparHorario(idHorario: number) {
        return this.prismaService.horariosDisponiveis.update({
            data: {
                ocupado: false
            },
            where: {
                idHorario: idHorario
            }
        })
    }

    findById(idhorario: number) {
        return this.prismaService.horariosDisponiveis.findUnique({
            where: {
                idHorario: idhorario
            }
        })
    }

    lancarHorario(tx: Prisma.TransactionClient, dto: HorarioDto) {
    return tx.horariosDisponiveis.create({
        data: dto
    })
}

    cancelarHorario(idHorario: number) {
        return this.prismaService.horariosDisponiveis.delete({
            where: {
                idHorario: idHorario
            }
        })
    }

    async horarioConflite(tx: Prisma.TransactionClient, horarioInicio: Date, horarioTermino: Date, idEstabelecimento: number, idColaborador: number): Promise<boolean> {
        const inicio = new Date(horarioInicio);
  const termino = new Date(horarioTermino);
  const candidatos = await tx.horariosDisponiveis.findMany({
    select: { dataHora: true, minutosDuracao: true },
    where: {
      idEstabelecimento,
      idColaborador,
      dataHora: { lt: termino },
    },
  })

  return candidatos.some(h => {
    const fimExistente = addMinutes(h.dataHora, h.minutosDuracao)
    return fimExistente > inicio
  })
}

}
