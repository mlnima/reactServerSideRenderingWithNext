import {Translations} from "../_typeScriptTypes/Translations";

export interface Meta {
    coverImageUrl?: string,
    _id: string,
    name: string,
    description?: string,
    type: string,
    status?: string,
    imageUrl?: string,
    imageUrlLock?: boolean,
    translations?: Translations,
    count?: number,
    likes?:number,
    views?:number,
    rank?:number,
    additionalInfo?: {},
    createdAt?: Date,
    updatedAt?: Date,
}