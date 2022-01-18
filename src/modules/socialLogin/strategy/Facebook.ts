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

class Facebook extends SocialLoginStrategy {
    async tokenInfo(token: string): Promise<SocialLoginInfo> {
        // https://developers.facebook.com/docs/graph-api/using-graph-api/
        try {
            let userData = (
                await axios.get("https://graph.facebook.com/v2.10/me", {
                    params: {
                        fields: "email,name",
                        access_token: token,
                    },
                })
            ).data;

            return {
                type: SocialLoginStrategies.FACEBOOK,
                email: userData.email,
                userId: userData.id,
                userName: userData.name,
                profileImage: `https://graph.facebook.com/v2.10/${userData.id}/picture?type=normal`,
            };
        } catch (err) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰");
        }
    }
}
export default new Facebook()