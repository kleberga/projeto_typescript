import { AtualizarCursoDTO, CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import { injectable } from "inversify";
import 'reflect-metadata';
import CursoRepositorioInterface from "../../2dominio/interfaces/repositorios/curso-interface-repository";
import dotenv from 'dotenv';
import { Collection, MongoClient, ObjectId, ServerApiVersion, WithId } from "mongodb";
import CursoModel from "../../1entidades/cursos";
import InternalErrorException from "../../2dominio/exceptions/internal-error-exception";
import { NextFunction } from "express";
import { CursoSchemaDriver } from "../database/schemas/cursoSchema";

dotenv.config({path:'./src/.env'})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHAVEMONGO = process.env.MONGO_DB_KEY;

@injectable()
class CursoRepositorio implements CursoRepositorioInterface{

    private readonly CHAVEMONGO = process.env.MONGO_DB_KEY ?? '';
    private readonly dbName: string = 'dev';
    private readonly collectionName: string = 'cursos';
    private next: NextFunction | undefined;

    private async getCollection(): Promise<{collection: Collection<CursoSchemaDriver>, client: MongoClient}>{
        const client = new MongoClient(this.CHAVEMONGO, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        await client.connect();
        const db = client.db(this.dbName);
        const collection = db.collection<CursoSchemaDriver>(this.collectionName);
        return {collection, client}
    }

    public async buscaCursos(): Promise<(CursoModel | undefined)[]>{
        const { collection, client } = await this.getCollection();
        try{
            const cursos = await collection.find({}).toArray();
            return cursos.map((cursoSchema) => this.schemaParser(cursoSchema));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao recuperar os cursos! Tente novamente.');
        } finally {
            client.close();
        }
    }

    /**
     * Este método busca um curso pelo id.
     * @param id 
     * @returns {CursoSchemaDriver}
     * @example {id: 1, nome: "Ciência da Computação", ...}
     */
    public async buscaCursosPorId(id: number): Promise<CursoModel | undefined> {
        const { collection, client } = await this.getCollection();
        try{
            const cursoSchema = await collection.findOne({id: id});
            return this.schemaParser(cursoSchema);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao recuperar o curso! Tente novamente.')
        } finally {
            client.close();
        }
    }

    public async criarCurso (curso: CriarCursoDTO): Promise<void> {
        const { collection, client } = await this.getCollection();
        try{
            const cursoMaiorId = await collection.find({}).sort({id:-1}).limit(1).toArray();
            const novoCurso: CursoSchemaDriver = {
                _id: new ObjectId(),
                id: cursoMaiorId[0].id + 1,
                nome: curso.nome,
                descricao: curso.descricao,
                duracao_meses: curso.duracao_meses
            };
            await collection.insertOne(novoCurso);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao criar o curso! Tente novamente.')
        } finally {
            await client.close()
        }
    }

    public async atualizarCurso (id: number, curso: AtualizarCursoDTO): Promise<void> {
        const { collection, client } = await this.getCollection();
        try {
            const atualizacao = {
                $set: {
                    ...(curso.nome && {nome: curso.nome}),
                    ...(curso.descricao !== undefined && {descricao: curso.descricao}),
                    ...(curso.duracao_meses !== undefined && {duracao_meses: curso.duracao_meses}),
                }
            };
            await collection.updateOne({id}, atualizacao)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao atualizar o curso! Tente novamente.')
        } finally {
            await client.close()
        }
    }

    public async deletarCurso (id: number): Promise<void> {
        const { collection, client } = await this.getCollection();
        try {
            await collection.deleteOne({id: id});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error){
            throw new InternalErrorException('Erro interno ao deletar o curso! Tente novamente.')
        } finally {
            await client.close()
        }
    }

    private schemaParser(cursoSchema: WithId<CursoSchemaDriver> | null): CursoModel | undefined {
        if(cursoSchema){
            const curso = new CursoModel(
                cursoSchema?.id ?? 0,
                cursoSchema?.nome ?? '',
                cursoSchema?.descricao ?? '',
                cursoSchema?.duracao_meses ?? '',
                cursoSchema?._id?.toString() ?? ''
            );
            return curso;
        }
        return undefined;
    }
}

export default CursoRepositorio;