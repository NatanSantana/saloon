import { Controller, Delete, Post } from "@nestjs/common";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";
import { EstabelecimentoService } from "../service/estabelecimento.service.js";

@Controller("/estabelecimento")
export class EstabelecimentoController {
    constructor(private estabelecimentoService: EstabelecimentoService) {}


    @Post("/criar")
    criarEstabelecimento(dto: EstabelecimentoDto) {
        return this.estabelecimentoService.cadastrar(dto)
    }

    @Delete("/deletar")
    removerEstabelecimento(cnpj: string, dono: number) {
        return this.estabelecimentoService.removerEstabelecimento(cnpj, dono)
    }
}