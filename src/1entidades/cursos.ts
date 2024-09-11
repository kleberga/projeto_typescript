export class CursoModel {
    id: number;
    nome: string;
    descricao: string;
    duracao_meses: number

    constructor(
        id: number,
        nome: string,
        descricao: string,
        duracao_meses: number
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.duracao_meses = duracao_meses
    }
}

export default CursoModel;

