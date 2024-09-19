import { body, validationResult, param } from "express-validator";
import { CriarCursoDTO } from "../../2dominio/dtos/cursoDTO";
import {Router, Request, Response} from 'express';
import { inject, injectable } from "inversify";
import asyncHandler from "../utils/async-handler";
import CursoServiceInterface from "../../2dominio/interfaces/services/curso-service-interface";


@injectable()
class CursoController {

    private readonly cursoService: CursoServiceInterface;
    public readonly router: Router = Router();

    constructor (@inject('CursoService') cursoService: CursoServiceInterface){
        this.cursoService = cursoService;
        this.routes();
    }

    routes () {
        this.router.get('/', this.buscaCursos.bind(this));
        this.router.get('/:id',
            [
                param('id').isNumeric().withMessage("O campo id deve ser um número")
            ], asyncHandler(this.buscaCursosPorId.bind(this)));
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
            ], asyncHandler(this.criarCurso.bind(this)));
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
            ], asyncHandler(this.atualizarCurso.bind(this)));
        this.router.delete('/:id',
            [
                param('id').isNumeric().withMessage("O campo id deve ser um número"),
            ], asyncHandler(this.deletarCurso.bind(this)));
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
     *       500:
     *         description: Erro interno ao recuperar os cursos! Tente novamente.
     */
    async buscaCursos (req: Request, res: Response): Promise<void> {
        const cursos = await this.cursoService.buscarTodos();
        res.status(200).send(cursos);
    }


     /**
     * @swagger
     *  tags:
     *  - name: cursos
     *    description: Operações relacionadas aos cursos de graduação
     * /cursos/{id}:
     *   get:
     *     summary: Retornar um único curso identificado pelo id
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
     *         description: Curso inexistente!
     *       500:
     *         description: Erro interno ao recuperar o curso! Tente novamente.
     */
    async buscaCursosPorId (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        const curso = await this.cursoService.buscaCursosPorId(+id);
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
    async criarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const curso: CriarCursoDTO = req.body;
        await this.cursoService.criarCurso(curso);
        return res.status(201).send("Curso inserido com sucesso!");
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
     *       200:
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
    async atualizarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id.toString();
        await this.cursoService.atualizar(+id, req.body);
        return res.status(200).send("Curso atualizado com sucesso!")
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
    async deletarCurso (req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        await this.cursoService.deletar(+id);
        return res.status(200).send("Curso deletado com sucesso!");
    }
}

export default CursoController;