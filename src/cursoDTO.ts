import CursoModel from "./entidades/cursos";

export type CriarCursoDTO = Omit<CursoModel, 'id'>

export type AtualizarCursoDTO = Partial<CriarCursoDTO>;

