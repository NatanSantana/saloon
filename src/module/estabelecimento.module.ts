import { Module } from "@nestjs/common";
import { EstabelecimentoController } from "../controller/estabelecimento.controller.js";
import { EstabelecimentoRepository } from "../repository/estabelecimento.respository.js";
import { EstabelecimentoService } from "../service/estabelecimento.service.js";
import { UserRepository } from "../repository/user.repository.js";

@Module({
  imports: [],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoRepository, EstabelecimentoService, UserRepository],
  exports: [EstabelecimentoRepository, EstabelecimentoService]
})
export class EstabelecimentoModule {}