import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller.js';
import { UserService } from '../service/user.service.js';
import { UserRepository } from '../repository/user.repository.js';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
