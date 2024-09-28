import CampusModel from "../../../1entidades/campus";

interface CampusRepositorioInterface {
    buscarTodos(): Promise<(CampusModel | undefined)[]>;
    criar(campus: CampusModel): Promise<void>;
    deletar(id: string): Promise<boolean>;
    adicionarCurso(cursoId: string, campusData: CampusModel): Promise<CampusModel | undefined>;
}

export default CampusRepositorioInterface;