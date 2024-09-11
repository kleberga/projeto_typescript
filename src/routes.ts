import { Router } from 'express';
import container from './3infra/inversify-config';
import CursoController from './4api/controllers/cursoController';

const routes = Router();

const cursoController = container.get<CursoController>('CursoController');

routes.use('/cursos', cursoController.router);

export default routes;