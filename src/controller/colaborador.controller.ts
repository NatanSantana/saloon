import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { ColaboradorDto } from "../dto/create-colaborador.dto.js";
import { ColaboradorService } from "../service/colaborador.service.js";

@Controller("colaborador")
export class ColaboradorController {
    constructor(private colaboradorService: ColaboradorService) {

    }

    @Post("/criar")
    registrarColaborador(@Body() dto: ColaboradorDto) {
        return this.colaboradorService.criarColaborador(dto);
    }

    @Get()
    findById(@Query("id") idColaborador: number) {
        return this.colaboradorService.findById(idColaborador);
    }

    @Delete("deletarRegistro")
    deletarRegistroColaborador(@Query("idColaborador") idColaborador: number) {
        return this.colaboradorService.deletarColaborador(idColaborador);
    }

    @Patch("/demitir")
    demitirColaborador(@Query('idColaborador') idColaborador: number, @Query("idEstabelecimento") idEstabelecimento: number) {
        return this.colaboradorService.demitirColaborador(idColaborador, idEstabelecimento)
    }





}