import CursoSchema from "../../../3infra/cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoRepositorioInterface {
  buscaCursos (): Promise<CursoSchema[]>;
  buscaCursosPorId (id: number): Promise<CursoSchema | null>;
  criarCurso (curso: CriarCursoDTO): Promise<void>;
  atualizarCurso (id:number, dadosNovos: AtualizarCursoDTO): Promise<void>;
  deletarCurso (id: number): void;
}

export default CursoRepositorioInterface;