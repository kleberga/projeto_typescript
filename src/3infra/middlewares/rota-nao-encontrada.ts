import NotFoundException from "../../2dominio/exceptions/not-found-exception";
import { Request, Response, NextFunction } from "express";


const rotaNaoEncontradaMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundException(`Rota não encontrada - ${req.originalUrl}`);
    next(error)
});

export default rotaNaoEncontradaMiddleware;