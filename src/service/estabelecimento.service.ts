import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";

@Injectable()
export class EstabelecimentoService {
    constructor(private estabelecimentoRepository: EstabelecimentoRepository) {}

    async cadastrar(dto: EstabelecimentoDto) {
        return this.estabelecimentoRepository.cadastrarEstabelecimento(dto);
    }

    async removerEstabelecimento(cnpj, dono) {
        const estabelecimento = await this.estabelecimentoRepository.findByCnpj(cnpj);
        if (!estabelecimento) {
            throw new NotFoundException("Estabelecimento não encontrado")
        }
        if (estabelecimento.dono !== dono) {
            throw new UnauthorizedException("Não autorizado a ação de remover estabelecimento")
        }

        const estabelecimentoDeletado = await this.estabelecimentoRepository.deletarEstabelecimento(cnpj, dono);
        return estabelecimentoDeletado;
    }


}