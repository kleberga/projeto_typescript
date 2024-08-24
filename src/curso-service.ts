import NotFoundException from "./exceptions/not-found-exception";
import CursoRepositorio from "./infra/cursoRepositorio";
import CursoSchema from "./infra/cursoSchema";

class CursoService {

    private readonly cursoRepositorio: CursoRepositorio;

    constructor(cursoRepositorio: CursoRepositorio){
        this.cursoRepositorio = cursoRepositorio;
    }


    buscarId(id: number): CursoSchema | undefined {
        const curso = this.cursoRepositorio.buscaCursosPorId(id);
        if(!curso){
            throw new NotFoundException('Curso não encontrado!');
        }
        return curso;
    }
}

export default CursoService;