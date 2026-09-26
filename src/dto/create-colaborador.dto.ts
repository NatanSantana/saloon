


export class ColaboradorDto{
    dataEmissao: Date
    idEstabelecimento: number
    idUser: number

    constructor(dataEmissao: Date, idEstabelecimento: number, idUser: number) {
        this.dataEmissao = dataEmissao
        this.idEstabelecimento = idEstabelecimento
        this.idUser = idUser
    }

}