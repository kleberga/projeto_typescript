import CoordenadorVO from "./vo/coordenadorVO";

export class CursoModel {
    _id?: string;
    id: number;
    nome: string;
    descricao: string;
    duracao_meses: number;
    coordenador: CoordenadorVO;

    constructor(
        id: number,
        nome: string,
        descricao: string,
        duracao_meses: number,
        coordenador: CoordenadorVO,
        _id?: string,
    ) {
        this._id = _id;
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.duracao_meses = duracao_meses;
        this.coordenador = coordenador;
    }
}

export default CursoModel;

