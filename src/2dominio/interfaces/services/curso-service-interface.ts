import CursoModel from "../../../1entidades/cursos";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoServiceInterface {
    buscaCursosPorId(id: number): Promise<CursoModel | undefined>;
    buscarTodos (): Promise<(CursoModel | undefined)[]>;
    criarCurso (curso: CriarCursoDTO): Promise<void>;
    atualizar (id:number, curso: AtualizarCursoDTO): Promise<void>;
    deletar (id:number): Promise<void>;
}

export default CursoServiceInterface;