/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-27
 * @modify date 2022-01-27
 */

import { Document, Model, Schema } from "mongoose";


export interface IMenu {
    image: string
    name: string
    description: string
}

export enum Category {
    KOREAN = "korean",
    JAPANESE = "japanese",
    CHINESE = "chinese",
    WESTERN = "western",
    BUFFET = "buffet",
    PUB = "pub"
}

export interface ICoordinates {
    latitude: number
    longitude: number
}

export interface IPlace {

    image: string
    name: string
    description: string
    location: string

    coordinates: ICoordinates

    category: Category

    menu: IMenu[]

    updatedAt: Date
    createdAt: Date
}

export const PlaceSchema: Schema = new Schema(
    {
        image: { type: String, default: "", required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },

        coordinates: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },

        category: { type: String, enum: [Category.KOREAN, Category.JAPANESE, Category.CHINESE, Category.WESTERN, Category.BUFFET, Category.PUB] }

    },
    { timestamps: true }
)

export interface IPlaceSchema extends IPlace, Document {

}

export interface IPlaceModel extends Model<IPlaceSchema> {

}
