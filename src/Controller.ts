import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';


export default class Controller {
    /**
     * @description 데이터 리스폰스 규격
     * @param {Response} res Express Response
     * @param {number} status 상태 코드
     * @param {unknown} data 전송할 데이터
     * @param {string} message 메세지
     * @param {boolean} result 성공 여부
     */
    public response(res: Response, status: StatusCodes, data?: unknown, message?: string, result: boolean = true) {
        if (status >= 400)
            return res
                .status(status)
                .send({
                    data,
                    message: message || getReasonPhrase(status),
                })
                .end();
        else
            return res
                .status(status)
                .send({
                    data,
                })
                .end();
    }
}