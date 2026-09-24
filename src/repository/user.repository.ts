import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService.js";
import { UserDto } from "../dto/create-user.dto.js";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {

    }
    
    async findById(id: number){
        return await this.prismaService.user.findUnique({
            where: {
                idUser: id
            }
        })
    }

    async criarUser(user: UserDto) {
        return await this.prismaService.user.create({
            data: user
        })
    }

    async findByEmail(email: string) {
        return await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        });
    }


}