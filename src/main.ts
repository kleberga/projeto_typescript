import express from 'express';
import routes from './routes';
import Logger from './logger';
import AuthService from './auth-service';
import ErrorHandler from './error-handler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from './infra/swagger-options';
import swaggerUI from 'swagger-ui-express';

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
app.use(ErrorHandler.init());

app.listen(port, () => {
    console.log(`Servidor rodando na porta: http://localhost:${port}`);
})