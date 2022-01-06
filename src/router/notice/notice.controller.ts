import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Controller from "../Controller";

import noticeDummy from "../../../config/data/notice-dummy.json";

class NoticeController extends Controller {

    public async notices(req: Request, res: Response, next: NextFunction) {
        return super.response(res, StatusCodes.OK, noticeDummy)
    }
}

export default new NoticeController();