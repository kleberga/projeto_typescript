import CampusModel from "../../../1entidades/campus";

interface CampusServiceInterface {
    buscarTodos(): Promise<(CampusModel | undefined)[]>;
    criar(campus: CampusModel): Promise<void>;
    deletar(id: string): Promise<void>;
    adicionarCurso(cursoId: string, campusData: CampusModel): Promise<CampusModel | undefined>;
}

export default CampusServiceInterface;