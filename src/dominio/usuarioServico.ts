/* eslint-disable @typescript-eslint/no-unused-vars */
import UsuarioRepositorio from "../infra/usuarioRepositorio";
import UsuarioSchema from "../infra/usuarioSchema";

export function buscaUsuarios(): UsuarioSchema[] {
    const usuarioRepositorio = new UsuarioRepositorio();
    const usuarios = usuarioRepositorio.buscaUsuarios()
    return usuarios;
}

export function buscaUsuarioPorId (id: number): UsuarioSchema | undefined {
    const usuarioRepositorio = new UsuarioRepositorio();
    const usuario = usuarioRepositorio.buscaUsuariosPorId(id);
    if (usuario){
        return usuario
    }
    throw new Error('Usuário não encontrado');
}

export function criarUsuario(usuario: UsuarioSchema): void {
    const usuarioRepositorio = new UsuarioRepositorio();
    usuarioRepositorio.criarUsuario(usuario);
}