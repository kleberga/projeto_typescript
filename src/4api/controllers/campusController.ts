import { Router, Request, Response } from "express";
import CampusServiceInterface from "../../2dominio/interfaces/services/campus-service-interface";
import { inject, injectable } from "inversify";
import { body, param, validationResult } from "express-validator";
import asyncHandler from "../utils/async-handler";
import CampusModel from "../../1entidades/campus";
import mongoose from "mongoose";

@injectable()
class CampusController {
    private readonly campusService: CampusServiceInterface;
    public readonly router: Router = Router();

    constructor (@inject('CampusService') campusService: CampusServiceInterface){
        this.campusService = campusService;
        this.routes();
    }

    routes () {
        this.router.get('/', asyncHandler(this.buscarTodos.bind(this)));
        this.router.post('/',
            [
                body('cidade')
                .exists().withMessage('O campo cidade é obrigatório')
                .isString().withMessage("O campo cidade deve ser uma string"),
                body('telefone')
                .exists().withMessage('O campo telefone é obrigatório')
                .isString().withMessage("O campo telefone deve ser uma string"),
            ], asyncHandler(this.criarCampus.bind(this)));
        this.router.delete('/:id',
            [
                param('id')
                .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("O campo id deve ser um ObjectId")
            ], asyncHandler(this.deletarCampus.bind(this)));
        this.router.patch('/incluir-curso', 
            [
                body('cursoId')
                .exists().withMessage('O campo cursoId é obrigatório')
                .isString().withMessage("O campo cursoId deve ser uma string"),
                body('campusData')
                .exists().withMessage('O campo campusData é obrigatório')
                .custom(value => typeof value === 'object').withMessage("O campo campusData deve ser um object contendo pelo menos cidade e telefone"),
        ], asyncHandler(this.adicionarCurso.bind(this)));
    }

    /**
     * @swagger
     *  tags:
     *  - name: campus
     *    description: Operações relacionadas aos campus da faculdade
     * /campus:
     *   get:
     *     summary: Retornar todos os campus
     *     tags:
     *       - campus
     *     responses:
     *       200:
     *         description: Lista dos campus da faculdade, junto com os cursos que elas possuem
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
     *                   cidade:
     *                     type: string
     *                     example: Brasília
     *                   telefone:
     *                     type: string
     *                     example: 8888888
     *                   curso:
     *                     type: Array contendo referência para os cursos que o campus possui
     *                     example: [{"_id": "66e0dccd3acd8ae269205d1d", "id": 1, "nome": "Engenharia de software"}]
     *       401:
     *         description: Acesso não autorizado
     *       500:
     *         description: Erro interno ao recuperar os campus! Tente novamente.
     */
    async buscarTodos (req: Request, res: Response): Promise<void> {
        const campus = await this.campusService.buscarTodos();
        res.status(200).send(campus);
    }

    /**
     * @swagger
     *  tags:
     *  - name: campus
     *    description: Operações relacionadas aos campus da faculdade
     * /campus:
     *   post:
     *     summary: Criar um novo campus
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SchemaForBody1' 
     *     tags:
     *       - campus
     *     responses:
     *       201:
     *         description: Curso inserido com sucesso!
     *       400:
     *         description: Erro (algum campo faltando ou com formato incorreto)
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - $ref: '#/components/schemas/SchemaForError1'
     *       401:
     *         description: Acesso não autorizado
     *       500:
     *         description: Erro interno ao criar o curso! Tente novamente.
     * components:
     *   schemas:
     *     SchemaForError1:
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
     *               example: O campo cidade é obrigatório
     *             path: 
     *               type: string
     *               example: nome
     *             location: 
     *               type: string
     *               example: body
     *     SchemaForBody1:
     *       type: object
     *       properties:
     *         cidade:
     *           type: string
     *           example: "Maceió"
     *         telefone:
     *           type: string
     *           example: "1199999999"
     */
    async criarCampus(req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const campus: CampusModel = req.body;
        await this.campusService.criar(campus);
        return res.status(201).send("Campus inserido com sucesso!");
    }

    /**
     * @swagger
     *  tags:
     *  - name: campus
     *    description: Operações relacionadas aos cursos de graduação
     * /campus/{id}:
     *   delete:
     *     summary: Apagar um campus identificado pelo id
     *     tags:
     *       - campus
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         type: ObjectId
     *         minimum: 1
     *         description: ObjectId do campus a ser deletado
     *     responses:
     *       200:
     *         description: Campus deletado com sucesso!
     *       400:
     *         description: O campo id deve ser um ObjectId
     *       401:
     *         description: Acesso não autorizado
     *       404:
     *         description: Campus inexistente
     *       500:
     *         description: Erro interno ao deletar o campus! Tente novamente.
     */
    async deletarCampus(req: Request, res: Response) {
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const id = req.params.id;
        await this.campusService.deletar(id);
        return res.status(200).send("Campus deletado com sucesso!");
    }

    /**
     * @swagger
     *  tags:
     *  - name: campus
     *    description: Operações relacionadas aos campus da faculdade
     * /campus/incluir-curso:
     *   patch:
     *     summary: Adicionar um curso a um campus
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SchemaForBody2' 
     *     tags:
     *       - campus
     *     responses:
     *       201:
     *         description: Curso inserido com sucesso!
     *       400:
     *         description: Erro (algum campo faltando ou com formato incorreto)
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - $ref: '#/components/schemas/SchemaForError2'
     *       401:
     *         description: Acesso não autorizado
     *       500:
     *         description: Erro interno ao adicionar o curso ao campus! Tente novamente.
     * components:
     *   schemas:
     *     SchemaForError2:
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
     *               example: O campo cursoId é obrigatório
     *             path: 
     *               type: string
     *               example: nome
     *             location: 
     *               type: string
     *               example: body
     *     SchemaForBody2:
     *       type: object
     *       properties:
     *         cursoId:
     *           type: string
     *           example: "66e0dccd3acd8ae269205d1d"
     *         campusData:
     *           type: object
     *           example: {"cidade": "Rio de Janeiro", "telefone": "66666666"}
     */
    async adicionarCurso(req: Request, res: Response){
        const errosValidacao = validationResult(req);
        if(!errosValidacao.isEmpty()){
            return res.status(400).send({erros: errosValidacao.array()});
        }
        const body: {cursoId: string, campusData: CampusModel} = req.body;
        await this.campusService.adicionarCurso(body.cursoId, body.campusData);
        return res.status(200).send("Curso adicionado com sucesso!");
    }
}

export default CampusController;