import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { createHttpError, HttpError, SentenceKey } from "../modules/HttpError";
import Controller from "./Controller";

/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-22
 * @modify date 2022-01-22
 * @desc [description]
 */
class ErrorHandler extends Controller {
    /**
     * @description 404페이지 대신 404 JSON response
     */
    notFoundHandler(req: Request, res: Response, next: NextFunction) {
        return next(createHttpError(StatusCodes.NOT_FOUND, SentenceKey.NOT_FOUND));
    }

    /**
     * @description next(err)를 통한 일괄적인 에러 핸들링
     */
    async errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
        let status = err.status || 500; // 상태 코드
        if (status == 401) err.message = SentenceKey.UNAUTHORIZED; // 401 예외처리

        // 언어별 메세지가 있으면 그대로 진행, 아닐 시 기본값 사용
        let message = getReasonPhrase(err.status);

        // 개발용 메세지
        let devMessageObj = {
            devMessage: err.devMessage, // 개발용 메세지  (한글로 작성 가능, 유저에게 노출되지 않음)
        };

        // 에러 출력
        console.error(err)

        // message 필드는 유저에게 보여지고, data.devMessage는 개발시에 확인용으로 사용
        return super.response(res, status, devMessageObj, message, false)
    }
}
export default new ErrorHandler()