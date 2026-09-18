


export class ColaboradorDto{
    idColaborador: number
    dataEmissao: Date
    idEstabelecimento: number
    idUser: number

    constructor(idColaborador: number, dataEmissao: Date, idEstabelecimento: number, idUser: number) {
        this.dataEmissao = dataEmissao
        this.idColaborador = idColaborador
        this.idEstabelecimento = idEstabelecimento
        this.idUser = idUser
    }

}