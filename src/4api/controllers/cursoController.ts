import { body, validationResult, param } from "express-validator";
import { CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import {Router, Request, Response} from 'express';
import NotFoundException from "../../2dominio/exceptions/not-found-exception";
import InternalErrorException from "../../2dominio/exceptions/internal-error-exception";
import { inject, injectable } from "inversify";
import CursoRepositorioInterface from "../../2dominio/interfaces/repositorios/curso-interface-repository";

@injectable()
class CursoController {

    private readonly cursoRepositorio: CursoRepositorioInterface;
    public readonly router: Router = Router();

    constructor (@inject('CursoRepositorio') cursoRepositorio: CursoRepositorioInterface){
        this.cursoRepositorio = cursoRepositorio;
        this.routes();
    }

    routes () {
        this.router.get('/', this.buscaCursos.bind(this));
        this.router.get('/:id',
            [
                param('id').isNumeric().withMessage("O campo id deve ser um número")
            ], this.buscaCursosPorId.bind(this));
        this.router.post('/',
            [
                body('nome')
                .exists().withMessage('O campo nome é obrigatório')
                .isString().withMessage("O campo nome deve ser uma string"),
                body('descricao')
                .exists().withMessage('O campo descrição é obrigatório')
                .isString().withMessage("O campo descrição deve ser uma string"),
                body('duracao_meses')
                .exists().withMessage('O campo duracao_meses é obrigatório')
                .custom(value => typeof value === 'number').withMessage("O campo duracao_meses deve ser um número"),
            ], this.criarCurso.bind(this));
        this.router.patch('/:id',
            [
                param('id')
                .isNumeric().withMessage("O campo id deve ser um número"),
                body('nome')
                .isString().withMessage("O campo nome deve ser uma string"),
                body('descricao')
                .isString().withMessage("O campo descrição deve ser uma string"),
                body('duracao_meses')
                .custom(value => typeof value === 'number').withMessage("O campo duracao_meses deve ser um número"),
            ], this.atualizarCurso.bind(this));
        this.router.delete('/:id',
            [
                param('id').isNumeric().withMessage("O campo id deve ser um número!"),
            ], this.deletarCurso.bind(this));
    }

     /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos:
     *   get:
     *     summary: Retornar todos os cursos
     *     tags:
     *       - cursos
     *     responses:
     *       200:
     *         description: Lista de cursos de graduação
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: number
     *                     example: 1
     *                   nome:
     *                     type: string
     *                     example: Ciência da Computação
     *                   descricao:
     *                     type: string
     *                     example: O aprendizado em Engenharia de Software aborda uma visão aprofundada do processo de desenvolvimento de software
     *                   duracao_meses:
     *                     type: number
     *                     example: 48
     *       401:
     *         description: Acesso não autorizado
     *       510:
     *         description: Erro ao recuperar os cursos! Tente novamente.
     */
    buscaCursos (req: Request, res: Response) {
        try {
            const cursos = this.cursoRepositorio.buscaCursos();
            return res.status(200).send(cursos);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new InternalErrorException('Erro ao recuperar os cursos! Tente novamente.')
        }
    }

     /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos/{id}:
     *   get:
     *     summary: Retorna um único curso identificado pelo id
     *     tags:
     *       - cursos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: ID do curso a ser retornado
     *     responses:
     *       200:
     *         description: Lista contendo um único curso de graduação
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: number
     *                     example: 1
     *                   nome:
     *                     type: string
     *                     example: Ciência da Computação
     *                   descricao:
     *                     type: string
     *                     example: O aprendizado em Engenharia de Software aborda uma visão aprofundada do processo de desenvolvimento de software
     *                   duracao_meses:
     *                     type: number
     *                     example: 48
     *       400:
     *         description: O campo id deve ser um número
     *       401:
     *         description: Acesso não autorizado
     *       404:
     *         description: Curso inexistente
     */
    buscaCursosPorId (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        const curso = this.cursoRepositorio.buscaCursosPorId(+id);
        if(!curso){
            throw new NotFoundException('Curso inexistente!')
        }
        return res.status(200).send(curso);
    }

    /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos:
     *   post:
     *     summary: Criar um novo curso
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SchemaForBody' 
     *     tags:
     *       - cursos
     *     responses:
     *       201:
     *         description: Curso inserido com sucesso!
     *       400:
     *         description: Erro (algum campo faltando ou com formato incorreto)
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - $ref: '#/components/schemas/SchemaForErrror1'
     *       401:
     *         description: Acesso não autorizado
     *       500:
     *         description: Erro interno ao criar o curso! Tente novamente.
     * components:
     *   schemas:
     *     SchemaForErrror1:
     *       type: object
     *       properties:
     *         erros:
     *            type: object
     *            properties:
     *             type:
     *               type: string
     *               example: field
     *             msg: 
     *               type: string
     *               example: O campo nome é obrigatório
     *             path: 
     *               type: string
     *               example: nome
     *             location: 
     *               type: string
     *               example: body
     *     SchemaForBody:
     *       type: object
     *       properties:
     *         nome:
     *           type: string
     *           example: Engenharia de Software
     *         descricao:
     *           type: string
     *           example: O curso propicia trabalhar com desenvolvimento de software mobile e web.
     *         duracao_meses:
     *           type: number
     *           example: 48
     */
    criarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const curso: CriarCursoDTO = req.body;
        try {
            this.cursoRepositorio.criarCurso(curso);
            return res.status(201).send("Curso inserido com sucesso!")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new InternalErrorException('Erro interno ao criar o curso! Tente novamente.')
        }
    }

    /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos/{id}:
     *   patch:
     *     summary: Alterar um curso identificado pelo id
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SchemaForBody' 
     *     tags:
     *       - cursos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: ID do curso a ser atualizado
     *     responses:
     *       201:
     *         description: Curso atualizado com sucesso!
     *       400:
     *         description: Erro (algum campo com formato incorreto)
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - $ref: '#/components/schemas/SchemaForErrror1'
     *       401:
     *         description: Acesso não autorizado
     *       404:
     *         description: Curso inexistente!
     *       500:
     *         description: Erro interno ao atualizar o curso! Tente novamente.
     * components:
     *   schemas:
     *     SchemaForErrror1:
     *       type: object
     *       properties:
     *         erros:
     *            type: object
     *            properties:
     *             type:
     *               type: string
     *               example: field
     *             msg: 
     *               type: string
     *               example: O campo nome deve ser uma string
     *             path: 
     *               type: string
     *               example: nome
     *             location: 
     *               type: string
     *               example: body
     *     SchemaForBody:
     *       type: object
     *       properties:
     *         nome:
     *           type: string
     *           example: Engenharia de Software
     *         descricao:
     *           type: string
     *           example: O curso propicia trabalhar com desenvolvimento de software mobile e web.
     *         duracao_meses:
     *           type: number
     *           example: 48
     */
    atualizarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        const curso = this.cursoRepositorio.buscaCursosPorId(+id);
        if (curso) {
            try {
                this.cursoRepositorio.atualizarCurso(+id, req.body);
                return res.status(200).send("Curso atualizado com sucesso!")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(error) {
                throw new InternalErrorException('Erro interno ao atualizar o curso! Tente novamente.')
            }
        } else {
            throw new NotFoundException('Curso inexistente!')
        }
    }

    /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos/{id}:
     *   delete:
     *     summary: Apagar um curso identificado pelo id
     *     tags:
     *       - cursos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: ID do curso a ser deletado
     *     responses:
     *       200:
     *         description: Curso deletado com sucesso!
     *       400:
     *         description: O campo id deve ser um número
     *       401:
     *         description: Acesso não autorizado
     *       404:
     *         description: Curso inexistente!
     *       500:
     *         description: Erro interno ao deletar o curso! Tente novamente.
     */
    deletarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        const curso = this.cursoRepositorio.buscaCursosPorId(+id);
        // console.log(`curso: ${typeof curso != 'undefined'}`);
        if (typeof curso != 'undefined') {
            try {
                this.cursoRepositorio.deletarCurso(+id);
                return res.status(200).send("Curso deletado com sucesso!")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(error) {
                throw new InternalErrorException('Erro interno ao deletar o curso! Tente novamente.')
            }
        } else {
            throw new NotFoundException('Curso inexistente!')
        }
    }
}

export default CursoController;