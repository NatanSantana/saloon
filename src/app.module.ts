import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth.module.js';
import { UserModule } from './module/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { EstabelecimentoModule } from './module/estabelecimento.module.js';
import { ColaboradorModule } from './module/colaborador.module.js';
import { AgendamentoModule } from './module/agendamento.module.js';
import { HorarioModule } from './module/horario.module.js';

@Module({
  imports: [AuthModule, UserModule, EstabelecimentoModule, ColaboradorModule, AgendamentoModule, HorarioModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
