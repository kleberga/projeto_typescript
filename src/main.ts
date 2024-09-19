import express from 'express';
import routes from './4api/routes';
import AuthService from './2dominio/servicos/auth-service';
import ErrorHandler from './3infra/middlewares/error-handler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import Logger from './3infra/middlewares/logger';
import swaggerConfig from './3infra/swagger-options';
import rotaNaoEncontradaMiddleware from './3infra/middlewares/rota-nao-encontrada';

const app = express();
const port = 3000;
const swaggerOptions = swaggerJSDoc(swaggerConfig);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));
// utilizar json para receber e passar os dados
app.use(express.json());
// middleware para capturar o log das requisicoes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(Logger.init());
app.use(AuthService.protect());
app.use('/api', routes);
app.use(rotaNaoEncontradaMiddleware)
app.use(ErrorHandler.init());

app.listen(port, () => {
    console.log(`Servidor rodando na porta: http://localhost:${port}`);
})