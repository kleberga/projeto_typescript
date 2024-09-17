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

    public async buscaCursosPorId(id: number): Promise<CursoSchema> {
        const curso = await this.cursoRepositorio.buscaCursosPorId(id);
        if(!curso){
            throw new NotFoundException('Curso não encontrado!');
        }
        return curso;
    }

    public async buscarTodos (): Promise<CursoSchema[]>{
        return await this.cursoRepositorio.buscaCursos();
    }
    public async criarCurso (usuario: CursoSchema): Promise<void> {
        await this.cursoRepositorio.criarCurso(usuario);
    }
    public async atualizar (id:number, usuario: CursoSchema): Promise<void> {
        await this.cursoRepositorio.atualizarCurso(id, usuario);
    }
    public async deletar (id:number): Promise<void> {
        await this.cursoRepositorio.deletarCurso(id);
    }
}

export default CursoService;