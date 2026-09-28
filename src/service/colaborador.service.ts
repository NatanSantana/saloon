import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ColaboradorDto } from "../dto/create-colaborador.dto.js";
import { ColaboradorRepository } from "../repository/colaborador.repository.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { UserRepository } from "../repository/user.repository.js";
import { toZonedTime } from "date-fns-tz";


@Injectable()
export class ColaboradorService {
    constructor(private estabelecimentoRepository: EstabelecimentoRepository, 
        private userRepository: UserRepository, private colaboradorRepository: ColaboradorRepository) {}

    async criarColaborador(dto: ColaboradorDto) {
        const [estabelecimento, user, colaboradorExist] = await Promise.all([
            this.estabelecimentoRepository.findById(dto.idEstabelecimento),
            this.userRepository.findById(dto.idUser),
            this.colaboradorRepository.findByIdUserAndIdEstabelecimento(dto.idUser)
        ])

        if (!estabelecimento) {
            throw new NotFoundException("Estabelecimento não encontrado")
        }
        if (!user) {
            throw new NotFoundException("Usuário não encontrado")
        }

        if (colaboradorExist) {
            throw new ConflictException("Esse usuário já está cadastrado como colaborador")
        }

        const agora = toZonedTime(new Date(), "America/Sao_Paulo");

        dto.dataEmissao = agora;

        const colaborador = await this.colaboradorRepository.criarColaborador(dto)

        return colaborador
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