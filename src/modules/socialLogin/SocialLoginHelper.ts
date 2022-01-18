/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc Social login helper for abstracted social login methods
 */

import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../HttpError";
import SocialLoginStrategy, { SocialLoginStrategies } from "./SocialLoginStrategies";
import Facebook from "./strategy/Facebook";
import Kakao from "./strategy/Kakao";

/**
 * @description Fields which can be fetched by social login api
 */
export interface SocialLoginInfo {
    type: SocialLoginStrategies
    email: string
    userId: string
    userName: string
    profileImage: string
}

class SocialLoginHelper {
    private readonly socialLoginList = {
        [SocialLoginStrategies.KAKAO]: Kakao,
        [SocialLoginStrategies.FACEBOOK]: Facebook
        // todo
    }

    async socialLoginInformation(type: SocialLoginStrategies, token: string) {
        let social: SocialLoginStrategy = this.socialLoginList[type]
        if (!social) throw createHttpError(StatusCodes.BAD_REQUEST, SentenceKey.BAD_LOGIN_TYPE)
        return await social.tokenInfo(token)
    }
}

export default new SocialLoginHelper()