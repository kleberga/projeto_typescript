import CursoSchema from "../../../3infra/cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoServiceInterface {
    buscaCursosPorId(id: number): Promise<CursoSchema>;
    buscarTodos (): Promise<CursoSchema[]>;
    criarCurso (usuario: CriarCursoDTO): Promise<void>;
    atualizar (id:number, usuario: AtualizarCursoDTO): Promise<void>;
    deletar (id:number): Promise<void>;
}

export default CursoServiceInterface;