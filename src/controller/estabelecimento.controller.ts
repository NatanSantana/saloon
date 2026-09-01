import { Body, Controller, Delete, Post } from "@nestjs/common";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";
import { EstabelecimentoService } from "../service/estabelecimento.service.js";

@Controller("/estabelecimento")
export class EstabelecimentoController {
    constructor(private estabelecimentoService: EstabelecimentoService) {}


    @Post("/criar")
    criarEstabelecimento(@Body() dto: EstabelecimentoDto) {
        return this.estabelecimentoService.cadastrar(dto)
    }

    @Delete("/deletar")
    removerEstabelecimento(@Body() body: {cnpj: string, dono: number} ) {
        return this.estabelecimentoService.removerEstabelecimento(body.cnpj, body.dono)
    }
}