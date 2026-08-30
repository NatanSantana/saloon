import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth.module.js';
import { UserModule } from './module/user.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
