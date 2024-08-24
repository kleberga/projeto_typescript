import { Router } from 'express';
import CursoRepositorio from './infra/cursoRepositorio';
import CursoController from './cursoController';

const routes = Router();

const cursoRepositorio = new CursoRepositorio();
const cursoController = new CursoController(cursoRepositorio);

routes.use('/cursos', cursoController.router);

export default routes;