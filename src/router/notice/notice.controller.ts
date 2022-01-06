import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Controller from "../../Controller";

class NoticeController extends Controller {

    public async notices(req: Request, res: Response, next: NextFunction) {
        return super.response(res, StatusCodes.OK, [
            { "type": "candy", "amount": 10 },
            { "type": "candy", "amount": 15 },
            { "type": "candy", "amount": 20 },
            { "type": "candy", "amount": 25 },
            { "type": "candy", "amount": 30 },
            { "type": "candy", "amount": 40 },
            { "type": "candy", "amount": 100 }
        ])
    }
}

export default new NoticeController();