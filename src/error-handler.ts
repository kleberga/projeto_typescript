import { NextFunction, Request, Response } from "express";
import CustomError from "./exceptions/custom-error";

class ErrorHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handleError (error: Error, req: Request, res: Response, next: NextFunction){
        let status = 500;
        const mensagem = error.message;
        console.error(`Erro: Status: ${status}; Mensagem: ${mensagem}`);
        if(error instanceof CustomError){
            status = error.statusCode;
            res.status(status).send({
                status: error.statusCode, 
                mensagem});
                return;
        }
        res.status(status).send({
            status, 
            mensagem
        });
        return;
    }

    public static init (): (error: Error, req: Request, res: Response, next: NextFunction) => void {
        const errorHandler = new ErrorHandler();
        return errorHandler.handleError.bind(errorHandler);
    }
}

export default ErrorHandler;

