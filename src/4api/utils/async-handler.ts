import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;