import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService.js";
import { UserDto } from "../dto/create-user.dto.js";

@Injectable()
export class UserRepository {
    
    async findById(id: number){
        return await PrismaService.user.findUnique({
            where: {
                idUser: id
            }
        })
    }

    async criarUser(user: UserDto) {
        return await PrismaService.user.create({
            data: user
        })
    }

    async findByEmail(email: string) {
        return await PrismaService.user.findUnique({
            where: {
                email: email
            }
        });
    }


}