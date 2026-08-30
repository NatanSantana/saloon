
export class UserDto {
    nome: string
    email: string;
    senha: string;

    constructor(email: string, senha: string, nome: string) {
        this.email = email,
        this.senha = senha,
        this.nome = nome
    }


}