import { injectable } from "inversify";
import mongoose from "mongoose";
import CursoModel from "../../1entidades/cursos";
import { CursoSchema } from "./schemas/cursoSchema";
import CampusModel from "../../1entidades/campus";
import { CampusSchema } from "./schemas/campusSchema";

@injectable()
class DBModels{
    get cursoModel(): mongoose.Model<CursoModel>{
        return mongoose.model<CursoModel>('Curso', CursoSchema)
    }

    get campusModel(): mongoose.Model<CampusModel>{
        return mongoose.model<CampusModel>('Campus', CampusSchema)
    }
}

export default DBModels;