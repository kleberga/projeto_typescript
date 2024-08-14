import { Router } from 'express';
import UsuarioRepositorio from './usuarioRepositorio';
import UsuarioController from '../usuarioController';

const routes = Router();

const usuarioRepositorio = new UsuarioRepositorio();
const usuarioController = new UsuarioController(usuarioRepositorio);

routes.use('/usuarios', usuarioController.router);

export default routes;