/* import {buscaUsuarios} from "./dominio/usuarioServico";

const usuario = buscaUsuarios();
console.log("teste: ", usuario); */

import express from 'express';
import routes from './infra/routes';

const app = express();
const port = 3000;

// utilizar json para receber e passar os dados
app.use(express.json());

app.use('/api', routes);

/* app.get('/', (req: Request, res: Response) => {
    res.send("Bem vindo. Esta é a sua primeira API");
})

app.get('/usuarios', (req: Request, res: Response) => {
    const usuarios = buscaUsuarios();
    res.send(JSON.stringify(usuarios));
})

app.get('/usuarios/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const usuarios = buscaUsuarioPorId(+id);
    res.send(JSON.stringify(usuarios));
}) */

app.listen(port, () => {
    console.log(`Servidor rodando na porta: http://localhost:${port}`);
})