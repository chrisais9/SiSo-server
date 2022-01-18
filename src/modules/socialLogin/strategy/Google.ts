/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-18
 * @modify date 2022-01-18
 */

import { OAuth2Client } from "google-auth-library";
import { StatusCodes } from "http-status-codes";
import { createHttpError, SentenceKey } from "../../HttpError";
import { SocialLoginInfo } from "../SocialLoginHelper";
import SocialLoginStrategy, { SocialLoginStrategies } from "../SocialLoginStrategies";

class Google extends SocialLoginStrategy {
    client: OAuth2Client = new OAuth2Client("615397119216-hb3aroshkq8f7ptugsdbpj68bqg3b16l.apps.googleusercontent.com");
    async tokenInfo(token: string): Promise<SocialLoginInfo> {
        // https://developers.google.com/identity/sign-in/web/backend-auth
        try {
            const ticket = await this.client.verifyIdToken({ idToken: token });
            const payload = ticket.getPayload();
            return {
                type: SocialLoginStrategies.GOOGLE,
                email: payload.email,
                profileImage: payload.picture,
                userName: payload.name,
                userId: payload.sub,
            };
        } catch (err) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰");
        }
    }
}
export default new Google();