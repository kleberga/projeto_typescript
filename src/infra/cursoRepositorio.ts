import path from "path";
import fs from 'fs';
import DBSchema from "./dbSchema";
import CursoSchema from "./cursoSchema";
import { AtualizarCursoDTO, CriarCursoDTO } from "../cursoDTO";
import CursoModel from "../entidades/cursos";

class CursoRepositorio {
    caminhoArquivo: string;

    constructor(){
        this.caminhoArquivo = path.join(__dirname, 'DB.json');
    }

    acessoDB(): DBSchema {
        const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
        return JSON.parse(bdPuro);
    }

    buscaCursos(){
        const bd = this.acessoDB();
        return bd.cursos;
    }

    /**
     * Este método busca um usuário pelo id.
     * @param id 
     * @returns {CursoSchema}
     * @example {id: 1, nome: "Ciência da Computação", ...}
     */
    buscaCursosPorId(id: number): CursoSchema | undefined {
        const bd = this.acessoDB();
        const curso = bd.cursos.find((curso) => curso.id === id);
        return curso;
    }
 
    reescreverCursoArquivo(curso: Array<CursoSchema>): boolean {
        const bd = this.acessoDB();
        bd.cursos = curso;
        try {
            fs.writeFileSync(this.caminhoArquivo, JSON.stringify(bd));
            return true;
        } catch {
            return false
        }
    }

    criarCurso (curso: CriarCursoDTO) {
        const cursos = this.buscaCursos();
        const maiorId = cursos.reduce(
            (max, curso) => curso.id > max.id ? curso : max, cursos[0]
        );
        const novoCurso = new CursoModel(
            maiorId.id + 1,
            curso.nome,
            curso.descricao,
            curso.duracao_meses

        );
        cursos.push(novoCurso);
        this.reescreverCursoArquivo(cursos);
    }

    atualizarCurso (id: number, curso: AtualizarCursoDTO) {
        const cursos = this.buscaCursos();
        const posicaoCurso = cursos.findIndex(curso => curso.id === id);
        if( posicaoCurso !== -1){
            if(curso.nome) cursos[posicaoCurso].nome = curso.nome;
            if(curso.descricao) cursos[posicaoCurso].descricao = curso.descricao;
            if(curso.duracao_meses) cursos[posicaoCurso].duracao_meses = curso.duracao_meses;
        }
        this.reescreverCursoArquivo(cursos);
    }

    deletarCurso (id: number) {
        const cursos = this.buscaCursos();
        const posicaoCurso = cursos.findIndex(curso => curso.id === id);
        if( posicaoCurso !== -1){
            cursos.splice(posicaoCurso, 1);
        }
        this.reescreverCursoArquivo(cursos);
    }
}

export default CursoRepositorio;