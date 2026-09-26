import { Body, Controller, Delete, Post } from "@nestjs/common";
import { AgendamentoService } from "../service/agendamento.service.js";
import { AgendamentoDTO } from "../dto/create-agendamento.dto.js";

@Controller("/agendamento")
export class AgendamentoController {
    constructor(private agendamentoService: AgendamentoService) {}

    @Post()
    marcarAgendamento(@Body() dto: AgendamentoDTO) {
        return this.agendamentoService.marcarHorario(dto);
    }

    @Delete()
    desmarcarAgendamento(@Body() body: {idHorario: number, idAgendamento: number}) {
        return this.agendamentoService.cancelarAgendamento(body.idHorario, body.idAgendamento)
    }
}