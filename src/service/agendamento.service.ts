import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AgendamentoDTO } from "../dto/create-agendamento.dto.js";
import { AgendamentoRepository } from "../repository/agendamentos.repository.js";
import { HorariosRepository } from "../repository/horarios.repository.js";
import { UserRepository } from "../repository/user.repository.js";

@Injectable()
export class AgendamentoService {

    constructor(private agendamentoRepository: AgendamentoRepository, 
                private horarioRepository: HorariosRepository,
                private userRepository: UserRepository) {}

    async marcarHorario(dto: AgendamentoDTO) {

        const [user, horario] = await Promise.all([
            this.userRepository.findById(dto.idUser),
            this.horarioRepository.findById(dto.idHorario)
        ])

        if (!user) throw new NotFoundException("Usuário não encontrado")
        if (!horario) throw new NotFoundException("Horario não encontrado")

        if (horario.ocupado === true) {
            throw new ConflictException("Esse horário já está ocupado")
        }

        return await this.agendamentoRepository.marcarAgendamento(dto);
    }


    async cancelarAgendamento (idHorario: number, idAgendamento: number) {
        const [horario, agendamento] = await Promise.all([
            this.horarioRepository.desocuparHorario(idHorario),
            this.agendamentoRepository.desmarcarAgendamento(idAgendamento)
        ])

        if(!horario) throw new NotFoundException("Horário não encontrado")
        if(!agendamento) throw new NotFoundException("Agendamento não encontrado")

        return "Agendamento desmarcado"

    }


}