/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-18
 * @modify date 2022-01-18
 */
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../../HttpError";
import { SocialLoginInfo } from "../SocialLoginHelper";
import SocialLoginStrategy, { SocialLoginStrategies } from "../SocialLoginStrategies";

class Naver extends SocialLoginStrategy {
    async tokenInfo(token: string): Promise<SocialLoginInfo> {
        try {
            let userData = (
                await axios.get("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: token,
                    },
                })
            ).data;

            return {
                type: SocialLoginStrategies.KAKAO,
                email: userData?.response?.email,
                profileImage: userData?.response?.profile_image,
                userName: userData?.response?.nickname,
                userId: userData?.response?.id,
            };
        } catch (error) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰");
        }
    }
}
export default new Naver()