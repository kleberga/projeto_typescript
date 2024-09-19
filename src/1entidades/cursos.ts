export class CursoModel {
    _id?: string;
    id: number;
    nome: string;
    descricao: string;
    duracao_meses: number

    constructor(
        id: number,
        nome: string,
        descricao: string,
        duracao_meses: number,
        _id?: string,
    ) {
        this._id = _id;
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.duracao_meses = duracao_meses
    }
}

export default CursoModel;

