import CursoRepositorio from '../3infra/repositorios/cursoRepositorio';
import CursoService from '../2dominio/servicos/curso-service';
import CursoModel from '../1entidades/cursos';

jest.mock('../3infra/repositorios/cursoRepositorio')

describe('CursoService', () => {

    let cursoRepositorio: jest.Mocked<CursoRepositorio>;
    let cursoService: CursoService;

    beforeEach(() => {
        cursoRepositorio = new CursoRepositorio() as jest.Mocked<CursoRepositorio>;
        cursoService = new CursoService(cursoRepositorio);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('buscarPorId', () => {
        it('Deve retornar o curso correspondente ao id fornecido', async () => {
            const mockCurso: CursoModel = {
                id: 1, 
                nome: "Engenharia de software", 
                descricao: "O aprendizado em Engenharia de Software aborda uma visão aprofundada do processo de desenvolvimento de software, incluindo Inteligência Artificial, softwares escaláveis, microsserviços, Cloud, métodos ágeis e gestão do próprio processo de engenharia de software.", 
                duracao_meses: 48
            };
            cursoRepositorio.buscaCursosPorId.mockResolvedValue(mockCurso);
            const curso = await cursoService.buscaCursosPorId(1);
            expect(cursoRepositorio.buscaCursosPorId).toHaveBeenCalledWith(1);
            expect(curso).toEqual(mockCurso);
        });
        it("Deve retornar um erro se o curso não for encontrado", async () => {
            cursoRepositorio.buscaCursosPorId.mockResolvedValue(undefined);
            await expect(() => cursoService.buscaCursosPorId(999)).rejects.toThrow('Curso inexistente!');
            expect(cursoRepositorio.buscaCursosPorId).toHaveBeenCalledWith(999);
        });
    });
});