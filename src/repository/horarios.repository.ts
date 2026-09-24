import { Injectable } from "@nestjs/common";
import { horarioDto } from "../dto/create-horario.dto.js";
import { PrismaService } from "../prisma/prismaService.js";

@Injectable()
export class HorariosRepository {
    constructor(private prismaService: PrismaService) {

    }

    findById(idhorario: number) {
        return this.prismaService.horariosDisponiveis.findUnique({
            where: {
                idHorario: idhorario
            }
        })
    }

    lancarHorario(dto: horarioDto) {
        return this.prismaService.horariosDisponiveis.create({
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

    async horarioConflite(horarioInicio: Date, horarioTermino: Date, idEstabelecimento: number): Promise<boolean> {
  const conflitos = await this.prismaService.horariosDisponiveis.findMany({
    select: {
        idHorario: true
    },
    where: {
      idEstabelecimento: idEstabelecimento,
      horarioInicio: { lt: horarioTermino },
      horarioTermino: { gt: horarioInicio },
    },
  });

  return conflitos.length > 0;
}




}