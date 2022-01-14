/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-14
 * @modify date 2022-01-14
 * @desc [description]
 */

import { SocialLoginStrategies } from "./SocialLoginStrategie";

/**
 * Fields which can be fetched by social login api
 */
export interface SocialLoginInfo {
    type: SocialLoginStrategies
    userId: string
    userName: string
    profileImage: string
}