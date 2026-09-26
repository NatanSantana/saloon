import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { HorarioService } from "../service/horario.service.js";
import { HorarioDto } from "../dto/create-horario.dto.js";

@Controller("/horarios")
export class HorariosController {
    constructor(private horarioService: HorarioService){}


    @Post()
    registrarHorario(@Body() dto: HorarioDto[]) {
        return this.horarioService.lancarHorario(dto)
    }

    @Delete()
    deletarHorario(@Param("idHorario") idHorario: number){
        return this.horarioService.deletarHorario(idHorario)
    }


}