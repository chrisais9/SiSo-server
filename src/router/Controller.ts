import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { createHttpError, SentenceKey } from '../modules/HttpError';
import User, { IUserSchema } from '../schema/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUserSchema; // 로그인한 유저
        }
    }
}

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

    /**
     * @description Login middleware ( 로그인 성공 시 req.user에 유저 객체 반환 )
     */
    public static async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            // JWT 토큰을 가져옴
            let jwtToken = req.headers.authorization;
            if (!jwtToken) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 JWT 토큰");

            // 로그인 시도
            req.user = await User.loginByJWTToken(jwtToken)

            return next();
        } catch (err) {
            return next(err);
        }
    }
}