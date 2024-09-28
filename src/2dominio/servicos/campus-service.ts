import { inject, injectable } from "inversify";
import CampusServiceInterface from "../interfaces/services/campus-service-interface";
import CampusRepositorioInterface from "../interfaces/repositorios/campus-interface-repository";
import CampusModel from "../../1entidades/campus";
import NotFoundException from "../exceptions/not-found-exception";
import InternalErrorException from "../exceptions/internal-error-exception";


@injectable()
class CampusService implements CampusServiceInterface {
    constructor(@inject('CampusRepositorio') private campusRepositorio: CampusRepositorioInterface) {
        this.campusRepositorio = campusRepositorio;
    }

    public async buscarTodos(): Promise<(CampusModel | undefined)[]>{
        return await this.campusRepositorio.buscarTodos();
    }

    public async criar(campus: CampusModel): Promise<void>{
        await this.campusRepositorio.criar(campus);
    }

    public async deletar(id: string): Promise<void>{
        const campusDeletado = await this.campusRepositorio.deletar(id);
        if(campusDeletado){
            return;
        }
        throw new NotFoundException("Campus inexistente");
    }

    public async adicionarCurso(cursoId: string, campusData: CampusModel): Promise<CampusModel>{
        if(typeof campusData.cidade == 'undefined' || typeof campusData.telefone == 'undefined' ) throw new InternalErrorException("Atributos 'cidade' e 'telefone' são obrigatórios");
        if(typeof campusData.cidade == 'undefined' || typeof campusData.telefone == 'undefined' ) throw new InternalErrorException("Atributos 'cidade' e 'telefone' são obrigatórios");
        if(typeof campusData.cidade != 'string' || typeof campusData.telefone != 'string' ) throw new InternalErrorException("Atributos 'cidade' e 'telefone' devem ser strings");
        const campus = await this.campusRepositorio.adicionarCurso(cursoId, campusData);
        if(!campus) throw new NotFoundException("Curso ou campus não encontrado.");
        return campus;
    }


}

export default CampusService;