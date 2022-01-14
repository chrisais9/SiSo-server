import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../../modules/HttpError";
import User from "../../schema/User";
import Controller from "../Controller";

class AuthController extends Controller {

    /**
     * @description Login from social login access token
     */
    public async login(req: Request, res: Response, next: NextFunction) {
        let { type, token } = req.body

        try {
            let jwtToken = await User.loginBySocialToken(type, token)

            return super.response(res, StatusCodes.OK, jwtToken)
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @description register from social login access token
     */
    public async register(req: Request, res: Response, next: NextFunction) {
        let { type, token } = req.body

        try {
            let result = await User.registerBySocialToken(type, token)
            if (!result) throw createHttpError(StatusCodes.BAD_REQUEST, SentenceKey.BAD_DATA, "잘못된 로그인 정보")

            return super.response(res, StatusCodes.OK, result)
        } catch (error) {
            return next(error)
        }
    }

}

export default new AuthController()