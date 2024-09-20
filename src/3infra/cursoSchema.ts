import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import CursoModel from "../1entidades/cursos";

export type CursoSchemaDriver = {
    _id?: ObjectId;
    id: number,
    nome: string,
    descricao: string,
    duracao_meses: number
}

const CursoSchema: Schema = new Schema({
    id: {type: Number, require: true, unique: true},
    nome: {type: String, required: true},
    descricao: {type: String, required: true},
    duracao_meses: {type: String, required: true}
},{
    versionKey: false
});

export const CursoModelDb = mongoose.model<CursoModel>('Curso',CursoSchema);
