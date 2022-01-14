/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc User schema
 */

import { ObjectId } from "bson";
import { Schema } from "mongoose";
import { SocialLoginStrategies } from "../modules/socialLogin/SocialLoginStrategie";


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
        email: { type: String, unique: true },
        type: { type: String, enum: Object.values(SocialLoginStrategies), required: true, index: true },
        profileImage: { type: String, default: "" },
        userId: { type: String, required: true, unique: true, index: true },
        userName: { type: String, required: true, unique: true, index: true }
    },
    {
        timestamps: true
    }
)
