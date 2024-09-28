import { inject, injectable } from "inversify";
import CampusRepositorioInterface from "../../2dominio/interfaces/repositorios/campus-interface-repository";
import CampusModel from "../../1entidades/campus";
import mongoose from "mongoose";
import DBModels from "../database/dbSchema";
import CursoModel from "../../1entidades/cursos";
import InternalErrorException from "../../2dominio/exceptions/internal-error-exception";

@injectable()
class CampusRepositorio implements CampusRepositorioInterface{
    private campusModel: mongoose.Model<CampusModel>;
    private cursoModel: mongoose.Model<CursoModel>;
    constructor(
        @inject('DBModels') dbmodels: DBModels
    ) {
        this.campusModel = dbmodels.campusModel;
        this.cursoModel = dbmodels.cursoModel;
    }

    async adicionarCurso(cursoId: string, campusData: CampusModel): Promise<CampusModel | undefined> {
        try {
            const curso = await this.cursoModel.findById(cursoId);
            if(curso){
                curso.campus.push(campusData);
                await curso.save()
                return await this.campusModel.findOneAndUpdate(
                    {cidade: campusData.cidade},
                    {$addToSet: {curso: cursoId}, cidade: campusData.cidade, telefone: campusData.telefone},
                    {upsert: true}
                ) ?? undefined
            }
            return undefined;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao adicionar o curso ao campus! Tente novamente.')
        }
    }
    
    async buscarTodos(): Promise<(CampusModel | undefined)[]> {
        try {
            return await this.campusModel.find().populate('curso');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao buscar os campus! Tente novamente.')
        }
        
    };

    async criar(campus: CampusModel): Promise<void>{
        try {
            const campusModel = new this.campusModel(campus);
            await campusModel.save();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao criar o campus! Tente novamente.')
        }
    }

    async deletar(_id: string): Promise<boolean>{
        try {
            const resultado = await this.campusModel.deleteOne({_id});
            return resultado.deletedCount > 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao deletar o campus! Tente novamente.')
        }
    }
    
}

export default CampusRepositorio;