import CursoSchema from '../infra/cursoSchema';
import CursoRepositorio from '../infra/cursoRepositorio';
import CursoService from '../curso-service';


jest.mock('../infra/cursoRepositorio')

describe('CursoService', () => {

    let cursoRepositorio: jest.Mocked<CursoRepositorio>;
    let cursoService: CursoService;

    beforeEach(() => {
        cursoRepositorio = new CursoRepositorio() as jest.Mocked<CursoRepositorio>;
        cursoService = new CursoService(cursoRepositorio);
    })

    afterAll(() => {
        jest.clearAllMocks();
    })



    describe('buscarPorId', () => {
        it('Deve retornar o curso correspondente ao id fornecido', () => {
            const mockCurso: CursoSchema = {id: 1, nome: "Ciência da Computação", descricao: "Curso de teste", duracao_meses: 48};

            //const cursoRepositorio = new CursoRepositorio() as jest.Mocked<CursoRepositorio>;

            cursoRepositorio.buscaCursosPorId.mockReturnValue(mockCurso);

            const curso = cursoService.buscarId(1);

            expect(cursoRepositorio.buscaCursosPorId).toHaveBeenCalledWith(1);
            expect(curso).toEqual(mockCurso);
        })
    })

    it("Deve retornar um erro se o curso não for encontrado", () => {
        cursoRepositorio.buscaCursosPorId.mockReturnValue(undefined);
        expect(() => cursoService.buscarId(999)).toThrow('Curso não encontrado');
        expect(cursoRepositorio.buscaCursosPorId).toHaveBeenNthCalledWith(999);
    })
})