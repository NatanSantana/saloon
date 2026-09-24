import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { HorariosRepository } from "../repository/horarios.repository.js";
import { horarioDto } from "../dto/create-horario.dto.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";

@Injectable()
export class HorarioService {
    constructor(private horarioRepository: HorariosRepository,
                private estabelecimentoRepository: EstabelecimentoRepository,
                private colaboradorRepository: ColaboradorRepository
    ) {}



    async lancarHorario(dto: horarioDto[]) {
        for (let valor of dto) {

            if(valor.dataHora < new Date()) throw new BadRequestException("O horário não pode estar no passado")
            if(valor.minutosDuracao <= 0) throw new BadRequestException("Os minutos de duração do serviço devem ser maiores que 0")

            const [estabelecimento, colaborador] = await Promise.all([
                this.estabelecimentoRepository.findById(valor.idEstabelecimento),
                this.colaboradorRepository.findById(valor.idColaborador)
            ])

            if (!estabelecimento) throw new NotFoundException("Não encontrado o estabelecimento")
            if (!colaborador) throw new NotFoundException("Não encontrado o colaborador")

            if (await this.horarioRepository.horarioConflite) {
                throw new ConflictException("Existe um horário conflitando com o que está sendo lançado")
            }
            valor.ocupado = false
            return await this.horarioRepository.lancarHorario(valor);

        }
    }

    async deletarHorario(idHorario: number) {
        const horario = this.horarioRepository.cancelarHorario(idHorario);
        if (!horario) {
            throw new NotFoundException("Horario não encontrado")
        }
        return horario
    }





}