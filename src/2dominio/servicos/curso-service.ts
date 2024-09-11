import NotFoundException from "../exceptions/not-found-exception";
import CursoSchema from "../../3infra/cursoSchema";
import CursoRepositorioInterface from "../interfaces/repositorios/curso-interface-repository";
import { inject, injectable } from "inversify";
import CursoServiceInterface from "../interfaces/services/curso-service-interface";

@injectable()
class CursoService implements CursoServiceInterface {

    private readonly cursoRepositorio: CursoRepositorioInterface;

    constructor(@inject('CursoRepositorio') cursoRepositorio: CursoRepositorioInterface){
        this.cursoRepositorio = cursoRepositorio;
    }

    buscaCursosPorId(id: number): CursoSchema | undefined {
        const curso = this.cursoRepositorio.buscaCursosPorId(id);
        if(!curso){
            throw new NotFoundException('Curso não encontrado!');
        }
        return curso;
    }

    public buscarTodos (): CursoSchema[]{
        return this.cursoRepositorio.buscaCursos();
    }
    public criarCurso (usuario: CursoSchema): void {
        this.cursoRepositorio.criarCurso(usuario);
    }
    public atualizar (id:number, usuario: CursoSchema): void {
        this.cursoRepositorio.atualizarCurso(id, usuario);
    }
    public deletar (id:number): void {
        this.cursoRepositorio.deletarCurso(id);
    }
}

export default CursoService;