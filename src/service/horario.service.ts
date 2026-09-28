import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { HorariosRepository } from "../repository/horarios.repository.js";
import { HorarioDto } from "../dto/create-horario.dto.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";
import { addMinutes } from 'date-fns'
import { PrismaService } from "../prisma/prismaService.js";
import { stringify } from "node:querystring";


@Injectable()
export class HorarioService {
    constructor(private horarioRepository: HorariosRepository,
                private estabelecimentoRepository: EstabelecimentoRepository,
                private colaboradorRepository: ColaboradorRepository,
                private prismaService: PrismaService
    ) {}



    async lancarHorario(dto: HorarioDto[]) {
    return await this.prismaService.$transaction(async (tx) => {
        for (let valor of dto) {
            if (typeof valor.minutosDuracao === "string") {
                throw new BadRequestException("Minutos duração deve ser number")
            }


            if (new Date(valor.dataHora) < new Date()) throw new BadRequestException("O horário não pode estar no passado")
            if (valor.minutosDuracao <= 0) throw new BadRequestException("Os minutos de duração do serviço devem ser maiores que 0")

            const [estabelecimento, colaborador] = await Promise.all([
                this.estabelecimentoRepository.findById(valor.idEstabelecimento),
                this.colaboradorRepository.findById(valor.idColaborador),
            ])

            if (!estabelecimento) throw new NotFoundException("Não encontrado o estabelecimento")
            if (!colaborador) throw new NotFoundException("Não encontrado o colaborador")

            const conflito = await this.horarioRepository.horarioConflite(tx, valor.dataHora, addMinutes(valor.dataHora, valor.minutosDuracao), valor.idEstabelecimento, valor.idColaborador)
            if (conflito) throw new ConflictException("Existe um horário conflitando com o que está sendo lançado")

            valor.ocupado = false
            await this.horarioRepository.lancarHorario(tx, valor)
        }
    })
}

    async deletarHorario(idHorario: number) {
        const horario = this.horarioRepository.cancelarHorario(idHorario);
        if (!horario) {
            throw new NotFoundException("Horario não encontrado")
        }
        return horario
    }





}