/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc Abstracted social login strategies
 */

import { SocialLoginInfo } from "./SocialLoinHelper";

export enum SocialLoginStrategies {
    KAKAO = "kakao",
    GOOGLE = "google",
    FACEBOOK = "facebook",
    APPLE = "apple",
    NAVER = "naver"
}

export default abstract class SocialLoginStrategie {
    /**
     * Resonse user information via token
     * @param token accesstoken
     */
    abstract tokenInfo(token: string): Promise<SocialLoginInfo>
}