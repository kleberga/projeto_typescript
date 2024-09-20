
import CursoRepositorioInterface from "../interfaces/repositorios/curso-interface-repository";
import { inject, injectable } from "inversify";
import CursoServiceInterface from "../interfaces/services/curso-service-interface";
import CursoModel from "../../1entidades/cursos";
import NotFoundException from "../exceptions/not-found-exception";

@injectable()
class CursoService implements CursoServiceInterface {

    private readonly cursoRepositorio: CursoRepositorioInterface;

    constructor(@inject('CursoRepositorio') cursoRepositorio: CursoRepositorioInterface){
        this.cursoRepositorio = cursoRepositorio;
    }

    public async buscaCursosPorId(id: number): Promise<CursoModel | undefined> {
        const curso = await this.cursoRepositorio.buscaCursosPorId(id);
        if(typeof curso == 'undefined'){
            throw new NotFoundException('Curso inexistente!')
        }
        return curso;
    }

    public async buscarTodos (): Promise<(CursoModel | undefined)[]>{
        return await this.cursoRepositorio.buscaCursos();
    }

    public async criarCurso (usuario: CursoModel): Promise<void> {
        await this.cursoRepositorio.criarCurso(usuario);
    }

    public async atualizar (id:number, cursoAtual: CursoModel): Promise<void> {
        const curso = await this.cursoRepositorio.buscaCursosPorId(+id);
        if (typeof curso == 'undefined') {
            throw new NotFoundException('Curso inexistente!')
        }
        await this.cursoRepositorio.atualizarCurso(id, cursoAtual);
    }

    public async deletar (id:number): Promise<void> {
        const curso = await this.cursoRepositorio.buscaCursosPorId(+id);
        if (typeof curso == 'undefined') {
            throw new NotFoundException('Curso inexistente!')
        } 
        await this.cursoRepositorio.deletarCurso(id);
    }
}

export default CursoService;