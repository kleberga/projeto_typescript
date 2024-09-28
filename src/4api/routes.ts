import { Router } from 'express';
import container from '../3infra/inversify-config';
import CursoController from './controllers/cursoController';
import CampusController from './controllers/campusController';

const routes = Router();

const cursoController = container.get<CursoController>('CursoController');
const campusController = container.get<CampusController>('CampusController');

routes.use('/cursos', cursoController.router);
routes.use('/campus', campusController.router);

export default routes;