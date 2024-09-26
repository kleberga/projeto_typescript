import { Container } from "inversify";
import CursoRepositorio from "./repositorios/cursoRepositorio-mongoose";
import CursoController from "../4api/controllers/cursoController";
import CursoRepositorioInterface from "../2dominio/interfaces/repositorios/curso-interface-repository";
import 'reflect-metadata';
import CursoServiceInterface from "../2dominio/interfaces/services/curso-service-interface";
import CursoService from "../2dominio/servicos/curso-service";
import DBModels from "./database/dbSchema";

const container = new Container();
container
    .bind<DBModels>('DBModels')
    .to(DBModels).inRequestScope();
container
    .bind<CursoRepositorioInterface>('CursoRepositorio')
    .to(CursoRepositorio).inRequestScope();
container
    .bind<CursoServiceInterface>('CursoService')
    .to(CursoService).inRequestScope();
container
    .bind<CursoController>('CursoController')
    .to(CursoController).inRequestScope();

export default container;