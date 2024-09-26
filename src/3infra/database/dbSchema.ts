import { injectable } from "inversify";
import mongoose from "mongoose";
import CursoModel from "../../1entidades/cursos";
import { CursoSchema } from "./schemas/cursoSchema";

@injectable()
class DBModels{
    get cursoModel(): mongoose.Model<CursoModel>{
        return mongoose.model<CursoModel>('Curso', CursoSchema)
    }
}

export default DBModels;