import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { IUserJWTToken, IUserSchema } from "../schema/User";
import EVM from './EnvironmentVariableManager';
import { createHttpError, SentenceKey } from './HttpError';

class JWTTokenManager {

    createUserJWTToken(user: IUserSchema): string {
        let userTokenData: IUserJWTToken = {
            user: user._id,
            type: user.type,
            createdAt: user.updatedAt,
        };

        console.log("-------" + userTokenData)

        return jwt.sign(userTokenData, EVM.SECRET, {
            issuer: "api.playground.party",
        });
    }

    verifyUserToken(jwtToken: string): IUserJWTToken {
        try {
            let verify = jwt.verify(jwtToken, EVM.SECRET);
            if (!verify) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.EXPIRED_TOKEN);

            return jwt.decode(jwtToken) as IUserJWTToken;
        } catch (err) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.EXPIRED_TOKEN);
        }
    }
}
export default new JWTTokenManager();