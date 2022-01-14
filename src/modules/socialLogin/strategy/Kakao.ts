import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../../HttpError";
import { SocialLoginInfo } from "../SocialLoginHelper";
import SocialLoginStrategy, { SocialLoginStrategies } from "../SocialLoginStrategies";

class Kakao extends SocialLoginStrategy {
    async tokenInfo(token: string): Promise<SocialLoginInfo> {
        // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
        try {
            let userData = (
                await axios.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Bearer token
                    },
                })
            ).data;

            return {
                type: SocialLoginStrategies.KAKAO,
                email: userData?.kakao_account?.email,
                profileImage: userData?.kakao_account?.profile?.thumbnail_image_url,
                userName: userData?.kakao_account?.profile?.nickname,
                userId: userData.id,
            };
        } catch (error) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰");
        }
    }
}
export default new Kakao();