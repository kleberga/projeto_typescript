/* eslint-disable @typescript-eslint/no-unused-vars */
import { AtualizarCursoDTO, CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import { injectable } from "inversify";
import 'reflect-metadata';
import CursoRepositorioInterface from "../../2dominio/interfaces/repositorios/curso-interface-repository";
import dotenv from 'dotenv';
import CursoModel from "../../1entidades/cursos";
import { CursoModelDb } from "../database/schemas/cursoSchema";
import InternalErrorException from "../../2dominio/exceptions/internal-error-exception";

dotenv.config({path:'./src/.env'})

@injectable()
class CursoRepositorio implements CursoRepositorioInterface{

    constructor(){}

    async buscaCursos(): Promise<(CursoModel | undefined)[]> {
        try {
            return await CursoModelDb.find();
        } catch (error){
            throw new InternalErrorException('Erro interno ao recuperar os cursos! Tente novamente.')
        }
    }

    async buscaCursosPorId(id: number): Promise<CursoModel | undefined> {
        try {
            const curso = await CursoModelDb.findOne({id});
            if(curso){
                return curso;
            } else {
                return undefined;
            }
        } catch (error){
            throw new InternalErrorException('Erro interno ao recuperar o curso! Tente novamente.')
        }
    }


    async criarCurso(curso: CriarCursoDTO): Promise<void> {
        try {
            const cursoMaiorId = await CursoModelDb.find().sort({id: -1}).limit(1);
            const cursoNovo = new CursoModel(
                (cursoMaiorId[0].id + 1),
                curso.nome,
                curso.descricao,
                curso.duracao_meses,
                curso.coordenador
            )
            const cursoNovoDB = new CursoModelDb(cursoNovo);
            await cursoNovoDB.save()
        } catch (error){
            throw new InternalErrorException('Erro interno ao criar o curso! Tente novamente.')
        }
    }

    async atualizarCurso(id: number, dadosNovos: AtualizarCursoDTO): Promise<void> {
        try {
            await CursoModelDb.findOneAndUpdate({id: id}, dadosNovos);
        } catch (error){
            throw new InternalErrorException('Erro interno ao atualizar o curso! Tente novamente.')
        }
    }

    async deletarCurso(id: number): Promise<boolean> {
        try {
            const resultado = await CursoModelDb.deleteOne({id: id});
            return resultado.deletedCount > 0;
        }  catch (error){
            throw new InternalErrorException('Erro interno ao deletar o curso! Tente novamente.')
        }
    }
}

export default CursoRepositorio;