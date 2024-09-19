
import CursoModel from "../../../1entidades/cursos";
import { AtualizarCursoDTO, CriarCursoDTO } from "../../dtos/cursoDTO";

interface CursoRepositorioInterface {
  buscaCursos (): Promise<(CursoModel | undefined)[]>;
  buscaCursosPorId (id: number): Promise<CursoModel | undefined>;
  criarCurso (curso: CriarCursoDTO): Promise<void>;
  atualizarCurso (id:number, dadosNovos: AtualizarCursoDTO): Promise<void>;
  deletarCurso (id: number): void;
}

export default CursoRepositorioInterface;