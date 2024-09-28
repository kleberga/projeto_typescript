import CampusModel from "./campus";
import CoordenadorVO from "./vo/coordenadorVO";

export class CursoModel {
    _id?: string;
    id: number;
    nome: string;
    descricao: string;
    duracao_meses: number;
    coordenador: CoordenadorVO;
    campus: CampusModel[] = [];

    constructor(
        id: number,
        nome: string,
        descricao: string,
        duracao_meses: number,
        coordenador: CoordenadorVO,
        campus?: CampusModel[],
        _id?: string,
    ) {
        this._id = _id;
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.duracao_meses = duracao_meses;
        this.coordenador = coordenador;
        if(campus){
            this.campus.push(...campus);
        }
    }
}

export default CursoModel;

