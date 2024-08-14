import UsuarioRepositorio from "./infra/usuarioRepositorio";
import {Router, Request, Response} from 'express';

class UsuarioController {

    private readonly usuarioRepositorio: UsuarioRepositorio;
    public readonly router: Router = Router();

    constructor (usuarioRepositorio: UsuarioRepositorio){
        this.usuarioRepositorio = usuarioRepositorio;
        this.routes();
    }

    routes () {
        this.router.get('/', this.buscarTodos.bind(this));
        this.router.get('/:id', this.buscaUsuariosPorId.bind(this));
        this.router.post('/inserir', this.criarUsuario.bind(this));
        this.router.put('/:id', this.atualizarUsuario.bind(this));
        this.router.delete('/:id', this.deletarUsuario.bind(this));
    }

    buscarTodos (req: Request, res: Response) {
        try {
            const usuarios = this.usuarioRepositorio.buscaUsuarios();
            return res.status(200).send(usuarios);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return res.status(500).send("Erro ao recuperar os usuários! Tente novamente.");
        }
    }

    buscaUsuariosPorId (req: Request, res: Response) {
        const id = req.params.id;
        const usuario = this.usuarioRepositorio.buscaUsuariosPorId(+id);
        if(usuario){
            return res.status(200).send(usuario);
        } else {
            return res.status(400).send("O id informado não foi encontrado!");
        }
    }

    criarUsuario (req: Request, res: Response) {
        const usuario = req.body;
        try {
            this.usuarioRepositorio.criarUsuario(usuario);
            return res.json("Usuário inserido com sucesso!")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return res.status(500).send("Erro ao inserir usuário! Tente novamente.")
        }
    }

    atualizarUsuario (req: Request, res: Response) {
        const id = req.params.id;
        const usuario = this.usuarioRepositorio.buscaUsuariosPorId(+id);
        if (usuario) {
            try {
                this.usuarioRepositorio.atualizarUsuario(+id, req.body);
                return res.status(200).send("Usuário atualizado com sucesso!")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(error) {
                return res.status(500).send("Falha ao atualizar usuário! Tente novamente.")
            }
        } else {
            return res.status(400).send("Usuário inexistente!")
        }
    }

    deletarUsuario (req: Request, res: Response) {
        const id = req.params.id;
        const usuario = this.usuarioRepositorio.buscaUsuariosPorId(+id);
        if (usuario) {
            try {
                this.usuarioRepositorio.deletarUsuario(+id);
                return res.status(200).send("Usuário deletado com sucesso!")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(error) {
                return res.status(500).send("Falha ao deletar usuário! Tente novamente.")
            }
        } else {
            return res.status(400).send("Usuário inexistente!")
        }
    }
}

export default UsuarioController;