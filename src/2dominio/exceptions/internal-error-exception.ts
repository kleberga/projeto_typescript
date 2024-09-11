import CustomError from "./custom-error";

class InternalErrorException extends CustomError {
    constructor(message: string = 'Erro ao utilizar o serviço. Tente novamente!'){
        super(message, 500)
    }
}

export default InternalErrorException;