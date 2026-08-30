import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../service/user.service.js';
import { UserController } from '../controller/user.controller.js';
import { UserModule } from './user.module.js';
import "dotenv/config";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT'],
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class AuthModule {}
