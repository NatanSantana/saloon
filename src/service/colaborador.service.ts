import { Injectable, NotFoundException } from "@nestjs/common";
import { ColaboradorDto } from "../dto/create-colaborador.dto.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { UserRepository } from "../repository/user.repository.js";


@Injectable()
export class ColaboradorService {
    constructor(private estabelecimentoRepository: EstabelecimentoRepository, 
        private userRepository: UserRepository, private colaboradorRepository: ColaboradorRepository) {}

    async criarColaborador(dto: ColaboradorDto) {
        const [estabelecimento, user] = await Promise.all([
            this.estabelecimentoRepository.findById(dto.idEstabelecimento),
            this.userRepository.findById(dto.idUser)
        ])

        if (!estabelecimento) {
            throw new NotFoundException("Estabelecimento não encontrado")
        }
        if (!user) {
            throw new NotFoundException("Usuário não encontrado")
        }

        dto.dataEmissao = new Date();

        await this.colaboradorRepository.criarColaborador(dto)

        return "Criado"
    }

    // deleta o registro de colaborador
    async deletarColaborador(idColaborador: number) {
        const colaborador = await this.colaboradorRepository.deletarColaborador(idColaborador);
        if (!colaborador) {
            throw new NotFoundException("Colaborador Não Encontrado")
        }
        return colaborador;
    }

    // tira o vínculo do colaborador a um estabelecimento
    async demitirColaborador(idColaborador: number, idEstabelecimento: number) {
        const colaborador = await this.colaboradorRepository.demitirColaborador(idColaborador, idEstabelecimento);
        if (!colaborador) {
            throw new NotFoundException("Colaborador Não Encontrado")
        }
        return colaborador;
    }

    async findById(idColaborador: number) {
        const colaborador = await this.colaboradorRepository.findById(idColaborador);
        if (!colaborador) {
            throw new NotFoundException("Colaborador Não Encontrado")
        }

        return colaborador;
    }





}