/* eslint-disable @typescript-eslint/no-unused-vars */
import { AtualizarCursoDTO, CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import { injectable } from "inversify";
import 'reflect-metadata';
import CursoRepositorioInterface from "../../2dominio/interfaces/repositorios/curso-interface-repository";
import dotenv from 'dotenv';
import CursoModel from "../../1entidades/cursos";
import { NextFunction } from "express";
import { connectDatabase } from "../database/mongoose.config";
import { CursoModelDb } from "../cursoSchema";

dotenv.config({path:'./src/.env'})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHAVEMONGO = process.env.MONGO_DB_KEY;

@injectable()
class CursoRepositorio implements CursoRepositorioInterface{

    constructor(){
        connectDatabase()
    }

    async buscaCursos(): Promise<(CursoModel | undefined)[]> {
        return await CursoModelDb.find();
    }

    async buscaCursosPorId(id: number): Promise<CursoModel | undefined> {
        const curso = await CursoModelDb.findOne({id});
        if(curso){
            return curso;
        } else {
            return undefined;
        }
    }

    async criarCurso(curso: CriarCursoDTO): Promise<void> {
        const cursoMaiorId = await CursoModelDb.find().sort({id: -1}).limit(1);
        const cursoNovo = new CursoModel(
            (cursoMaiorId[0].id + 1),
            curso.nome,
            curso.descricao,
            curso.duracao_meses
        )
        const cursoNovoDB = new CursoModelDb(cursoNovo);
        await cursoNovoDB.save()
    }

    async atualizarCurso(id: number, dadosNovos: AtualizarCursoDTO): Promise<void> {
        await CursoModelDb.findOneAndUpdate({id: id}, dadosNovos);
    }

    async deletarCurso(id: number): Promise<boolean> {
        const resultado = await CursoModelDb.deleteOne({id: id});
        return resultado.deletedCount > 0;
    }
}

export default CursoRepositorio;