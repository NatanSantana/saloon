import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "../dto/create-user.dto.js";
import { UserRepository } from "../repository/user.repository.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, 
                private jwtService: JwtService){}


    async criarUser(user: UserDto) {
        const isExistEmail = await this.userRepository.findByEmail(user.email);
        if (isExistEmail) {
            throw new ConflictException("Email já existente")
        }
        const salt = genSaltSync(10);
        user.senha = hashSync(user.senha, salt);



        return this.userRepository.criarUser(user);
    }

    async login(email: string, senha: string) {

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException("Usuário não encontrado")
        }

        if (compareSync(senha, user.senha)) {

            const payload = {sub: user.idUser, nome: user.nome, email: user.email}

            return {
                access_token: await this.jwtService.signAsync(payload)
            }

        }
    }


}