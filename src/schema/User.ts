/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc User schema
 */

import { ObjectId } from "bson";
import { StatusCodes } from "http-status-codes";
import { Document, model, Model, Schema } from "mongoose";
import { createHttpError, SentenceKey } from "../modules/HttpError";
import JWTTokenManger from "../modules/JWTTokenManger";
import SocialLoginHelper, { SocialLoginInfo } from "../modules/socialLogin/SocialLoginHelper";
import { SocialLoginStrategies } from "../modules/socialLogin/SocialLoginStrategies";


export interface IUserJWTToken {
    type: SocialLoginStrategies
    user: ObjectId
    createdAt: Date
}

export interface IUser {
    type: SocialLoginStrategies

    email: string
    userId: string
    userName: string
    profileImage: string

    updatedAt: Date
    createdAt: Date
}

export const UserSchema: Schema = new Schema(
    {
        type: { type: String, enum: Object.values(SocialLoginStrategies), required: true, index: true },

        email: { type: String, unique: true },
        userId: { type: String, required: true, unique: true, index: true },
        userName: { type: String, required: true, unique: true, index: true },
        profileImage: { type: String, default: "" }
    },
    {
        timestamps: true
    }
)

export interface IUserSchema extends IUser, Document {

}

export interface IUserModel extends Model<IUserSchema> {

    loginBySocialToken(this: IUserModel, type: SocialLoginStrategies, token: string): Promise<string>

    registerBySocialToken(this: IUserModel, type: SocialLoginStrategies, token: string, info?: SocialLoginInfo): Promise<string>

    loginByJWTToken(this: IUserModel, jwtToken: string): Promise<IUserSchema>
}

UserSchema.statics.loginBySocialToken = async function (this: IUserModel, type: SocialLoginStrategies, token: string): Promise<string> {
    try {
        let socialInfo = await SocialLoginHelper.socialLoginInformation(type, token)
        if (!socialInfo) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰")

        let user: IUserSchema = await this.findOne({ userId: socialInfo.userId }, { type: 1, userId: 1, updatedAt: 1 })
        if (user) {
            user.updatedAt = new Date()
            await user.save()

            let jwtToken = JWTTokenManger.createUserJWTToken(user)

            return jwtToken
        } else {
            return await this.registerBySocialToken(type, token)
        }
    } catch (error) {
        throw error
    }
}

UserSchema.statics.registerBySocialToken = async function (this: IUserModel, type: SocialLoginStrategies, token: string, info?: SocialLoginInfo): Promise<string> {
    if (!info) info = await SocialLoginHelper.socialLoginInformation(type, token)
    if (!info) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 소셜 토큰")

    let user: IUserSchema = await this.findOne({ userId: info.userId }, { userId: 1 })
    if (user) throw createHttpError(StatusCodes.CONFLICT, SentenceKey.ALREADY_REGISTERED, "이미 가입된 계정");

    let newUser = new this({
        type: info.type,
        email: info.email,
        userId: info.userId,
        userName: info.userName,
        profileImage: info.profileImage || ""
    })

    try {
        return JWTTokenManger.createUserJWTToken(await newUser.save())
    } catch (error) {
        throw createHttpError(StatusCodes.CONFLICT, SentenceKey.ALREADY_REGISTERED, "이미 가입된 계정")
    }
}

UserSchema.statics.loginByJWTToken = async function (this: IUserModel, jwtToken: SocialLoginStrategies): Promise<IUserSchema> {
    let tokenData = JWTTokenManger.verifyUserToken(jwtToken)
    if (!tokenData) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.EXPIRED_TOKEN, "만료된 JWT 토큰");

    let user = await this.findOne({ _id: tokenData.user });
    if (!user) throw createHttpError(StatusCodes.UNAUTHORIZED, SentenceKey.BAD_TOKEN, "잘못된 JWT 토큰");

    user.updatedAt = new Date();

    return await user.save();
}
export default model<IUserSchema>("User", UserSchema) as IUserModel