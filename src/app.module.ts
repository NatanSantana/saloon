import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth.module.js';
import { UserModule } from './module/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { EstabelecimentoModule } from './module/estabelecimento.module.js';

@Module({
  imports: [AuthModule, UserModule, EstabelecimentoModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
