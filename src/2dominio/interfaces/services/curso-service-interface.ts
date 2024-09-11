import CursoSchema from "../../../3infra/cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoServiceInterface {
    buscaCursosPorId(id: number): CursoSchema | undefined;
    buscarTodos (): CursoSchema[];
    criarCurso (usuario: CriarCursoDTO): void ;
    atualizar (id:number, usuario: AtualizarCursoDTO): void ;
    deletar (id:number): void ;
}

export default CursoServiceInterface;