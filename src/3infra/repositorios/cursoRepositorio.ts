import CursoSchema from "../cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import CursoModel from "../../1entidades/cursos";
import { injectable } from "inversify";
import 'reflect-metadata';
import CursoRepositorioInterface from "../../2dominio/interfaces/repositorios/curso-interface-repository";
import dotenv from 'dotenv';
import { Collection, MongoClient, ServerApiVersion } from "mongodb";

dotenv.config({path:'./src/.env'})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHAVEMONGO = process.env.MONGO_DB_KEY;

@injectable()
class CursoRepositorio implements CursoRepositorioInterface{

    private readonly CHAVEMONGO = process.env.MONGO_DB_KEY ?? '';
    private readonly dbName = 'dev';
    private readonly collectionName = 'cursos';

    private async getCollection(): Promise<{collection: Collection<CursoSchema>, client: MongoClient}>{
        const client = new MongoClient(this.CHAVEMONGO, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        await client.connect();
        const db = client.db(this.dbName);
        const collection = db.collection<CursoSchema>(this.collectionName);
        return {collection, client}
    }

    public async buscaCursos(): Promise<CursoSchema[]>{
        const { collection, client } = await this.getCollection();
        try{
            const cursos = await collection.find({}).toArray();
            return cursos;
        }  finally {
            client.close();
        }
    }

    /**
     * Este método busca um curso pelo id.
     * @param id 
     * @returns {CursoSchema}
     * @example {id: 1, nome: "Ciência da Computação", ...}
     */
    public async buscaCursosPorId(id: number): Promise<CursoSchema | null> {
        const { collection, client } = await this.getCollection();
        try{
            const cursos = await collection.findOne({id: id});
            return cursos;
        } finally {
            client.close();
        }
    }

    public async criarCurso (curso: CriarCursoDTO): Promise<void> {
        const { collection, client } = await this.getCollection();
        try{
            const cursoMaiorId = await collection.find({}).sort({id:-1}).limit(1).toArray();
            const novoCurso = new CursoModel(
                cursoMaiorId[0].id + 1,
                curso.nome,
                curso.descricao,
                curso.duracao_meses
    
            );
            await collection.insertOne(novoCurso);
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
            await collection.updateOne({id: id}, atualizacao)
        } finally {
            await client.close()
        }
    }

    public async deletarCurso (id: number): Promise<void> {
        const { collection, client } = await this.getCollection();
        try {
            await collection.deleteOne({id: id});
        } finally {
            await client.close()
        }
    }
}

export default CursoRepositorio;