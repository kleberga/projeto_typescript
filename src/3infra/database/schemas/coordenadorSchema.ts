import { Schema } from "mongoose";
import CoordenadorVO from "../../../1entidades/vo/coordenadorVO";

export const CoordenadorSchema: Schema = new Schema<CoordenadorVO>({
    nome: {type: String, required: true},
    telefone: {type: String, required: true}
})