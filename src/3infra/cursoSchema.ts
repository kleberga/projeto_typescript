import { ObjectId } from "mongodb";

type CursoSchema = {
    _id?: ObjectId;
    id: number,
    nome: string,
    descricao: string,
    duracao_meses: number
}

export default CursoSchema;