/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc Social login helper for abstracted social login methods
 */

import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../HttpError";
import { SocialLoginStrategies } from "./SocialLoginStrategies";
import Kakao from "./strategy/Kakao";

/**
 * @description Fields which can be fetched by social login api
 */
export interface SocialLoginInfo {
    type: SocialLoginStrategies
    userId: string
    userName: string
    profileImage: string
}

class SocialLoginHelper {
    private readonly socialLoginList = {
        [SocialLoginStrategies.KAKAO]: Kakao
        // todo
    }

    async socialLoginInformation(type: SocialLoginStrategies, token: string) {
        let social = this.socialLoginList[type]
        if (!social) throw createHttpError(StatusCodes.BAD_REQUEST, SentenceKey.BAD_LOGIN_TYPE)
        return await social.tokenInfo(token)
    }
}

export default new SocialLoginHelper()