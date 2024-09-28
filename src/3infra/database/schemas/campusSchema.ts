import { Schema } from "mongoose";

export const CampusSchema = new Schema({
    cidade: {type: String, required: true},
    telefone: {type: String, required: true, index:true, sparse:true},
    curso: [{type: Schema.Types.ObjectId, ref: 'Curso'}]
},{
    versionKey: false
})