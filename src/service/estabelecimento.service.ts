import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EstabelecimentoDto } from "../dto/create-estabelecimento.dto.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { UserRepository } from "../repository/user.repository.js";

@Injectable()
export class EstabelecimentoService {
    constructor(private estabelecimentoRepository: EstabelecimentoRepository, private userRepository: UserRepository) {}

    async cadastrar(dto: EstabelecimentoDto) {
        const userExist = await this.userRepository.findById(dto.dono);
        if (!userExist) {
            throw new NotFoundException("Não existe usuário com esse ID")
        }


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