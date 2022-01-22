import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import Jimp from "jimp";
import moment from "moment";
import S3Manager from "../../modules/aws/S3Manager";
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
     * @description Register from social login access token
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

    public async getProfile(req: Request, res: Response, next: NextFunction) {
        let user = req.user // from middleware

        return super.response(res, StatusCodes.OK, await user.save());
    }

    public async setProfileImage(req: Request, res: Response, next: NextFunction) {
        let user = req.user
        let imageFile = req.files?.file as UploadedFile
        let fileType = imageFile.name.split(".").pop()

        try {

            if (!imageFile || !fileType) throw createHttpError(StatusCodes.BAD_REQUEST, req.string[SentenceKey.NO_DATA], "이미지 데이터 누락")

            let file = imageFile.data
            try {
                file = await (await Jimp.read(imageFile.data)).resize(256, 256).getBufferAsync(imageFile.mimetype)
            } catch (error) { }

            let unixEpoch = moment().unix()

            let result = await S3Manager.upload("playground-siso", `user/${user._id}/profile_image-${unixEpoch}.${fileType}`, file)
            user.profileImage = result.Location

            return super.response(res, StatusCodes.OK, await user.save())
        } catch (error) {
            console.error(JSON.stringify(imageFile))
            return next(error)
        }
    }

}

export default new AuthController()