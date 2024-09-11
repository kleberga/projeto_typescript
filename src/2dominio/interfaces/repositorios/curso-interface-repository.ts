import CursoSchema from "../../../3infra/cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoRepositorioInterface {
  buscaCursos (): CursoSchema[];
  buscaCursosPorId (id: number): CursoSchema | undefined;
  criarCurso (curso: CriarCursoDTO): void;
  atualizarCurso (id:number, dadosNovos: AtualizarCursoDTO): void;
  deletarCurso (id: number): void;
}

export default CursoRepositorioInterface;