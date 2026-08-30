import { IsString, Matches } from "class-validator"

export class EnderecosDto {
    @IsString() 
    @Matches(/^\d{8}$/, { message: 'CEP deve conter 8 dígitos numéricos' }) 
    cep: string

    @IsString() 
    cidade: string

    @IsString() 
    bairro: string

    @IsString() 
    rua: string

    constructor(cep: string, cidade: string, bairro: string, rua: string) {
        this.cep = cep
        this.cidade = cidade
        this.bairro = bairro
        this.rua = rua
    }
}