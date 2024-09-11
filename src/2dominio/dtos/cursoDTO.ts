import CursoModel from "../1entidades/cursos";

export type CriarCursoDTO = Omit<CursoModel, 'id'>

export type AtualizarCursoDTO = Partial<CriarCursoDTO>;

