
export class UserDto {
    nome: string
    email: string;
    senha: string;
    cpf: string;

    constructor(email: string, senha: string, nome: string, cpf: string) {
        this.email = email,
        this.senha = senha,
        this.nome = nome
        this.cpf = cpf
    }


}