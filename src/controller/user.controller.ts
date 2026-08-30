import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserDto } from "../dto/create-user.dto.js";
import { UserService } from "../service/user.service.js";
import { AuthGuard } from "../guard/auth.guard.js";

@Controller("/user")
export class UserController {
    constructor(private userService: UserService) {}



    @Post("/sign")
    cadastrar(@Body() user: UserDto) {
        return this.userService.criarUser(user);
    }

    @Post("/login")
    login(@Body() body: {email: string, senha: string}) {
        return this.userService.login(body.email, body.senha);
    }

    @UseGuards(AuthGuard)
    @Get("/teste")
    teste() {
        return "testado"
    }


}