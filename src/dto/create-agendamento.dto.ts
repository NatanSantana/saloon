
export class AgendamentoDTO {
    idUser: number
    idHorario: number

    constructor(idUser: number, idHorario: number ) {
        this.idHorario = idHorario
        this.idUser = idUser
    }


}