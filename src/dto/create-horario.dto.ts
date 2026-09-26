import { Type } from 'class-transformer'

export class HorarioDto {
    @Type(() => Date)
    dataHora: Date
    idEstabelecimento: number
    idColaborador: number
    ocupado: boolean
    minutosDuracao: number

    constructor(dataHora: Date, 
        idEstabelecimento: number, 
        idColaborador: number,
        ocupado: boolean,
        minutosDuracao: number) {
        this.dataHora = dataHora
        this.idEstabelecimento = idEstabelecimento
        this.idColaborador = idColaborador
        this.ocupado = ocupado
        this.minutosDuracao = minutosDuracao
    }

}