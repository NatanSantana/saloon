import { IsString, IsNotEmpty, ValidateNested, Matches, IsInt  } from 'class-validator';
import { EnderecosDto } from "./create-endereco.dto.js"
import { Type } from 'class-transformer';

export class EstabelecimentoDto {
    @IsInt()  dono: number
    @IsString() nome: string
    @Matches(/^\d{14}$/, { message: 'CNPJ deve conter 14 dígitos numéricos' })
    @IsString() cnpj: string
    @ValidateNested()
    @Type(() => EnderecosDto) endereco: EnderecosDto

    constructor(nome: string, cpnj: string, endereco: EnderecosDto, dono: number) {
        this.nome = nome
        this.cnpj = cpnj
        this.endereco = endereco 
        this.dono = dono
        
    }



}