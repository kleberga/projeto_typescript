import path from "path";
import fs from 'fs';
import DBSchema from "./dbSchema";
import UsuarioSchema from "./usuarioSchema";

class UsuarioRepositorio {
    caminhoArquivo: string;

    constructor(){
        this.caminhoArquivo = path.join(__dirname, 'fakeDB.json');
    }

    acessoDB(): DBSchema {
        const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
        return JSON.parse(bdPuro);
    }

    buscaUsuarios(){
        const bd = this.acessoDB();
        return bd.users;
    }

    buscaUsuariosPorId(id: number): UsuarioSchema | undefined {
        const bd = this.acessoDB();
        const usuario = bd.users.find((user) => user.id === id);
        return usuario;
    }
 
    reescreverArquivo(DBAtualizado: DBSchema): boolean {
        try {
            fs.writeFileSync(this.caminhoArquivo, JSON.stringify(DBAtualizado));
            return true;
        } catch {
            return false
        }
    }

    criarUsuario (usuario: UsuarioSchema) {
        const bd = this.acessoDB();
        bd.users.push(usuario);
        this.reescreverArquivo(bd);
    }

    atualizarUsuario (id: number, usuario: UsuarioSchema) {
        const bd = this.acessoDB();
        for (let i = 0; i <= bd.users.length - 1; ++i) {
            if(bd.users[i].id === id){
                bd.users[i].nome = usuario.nome;
                bd.users[i].ativo = usuario.ativo;
            }
        }
        this.reescreverArquivo(bd);
    }

    deletarUsuario (id: number) {
        const bd = this.acessoDB();
        for (let i = 0; i <= bd.users.length - 1; i++){
            if (bd.users[i].id === id) {
                bd.users.splice(i, 1);
            }
        }
        this.reescreverArquivo(bd);
    }
}

export default UsuarioRepositorio;