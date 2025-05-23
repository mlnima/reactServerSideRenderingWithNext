import {Translations} from "./Translations";

export interface IMeta {
    parentId?: string |undefined,
    coverImageUrl?: string,
    _id?: string,
    name: string,
    description?: string,
    type: 'categories' | 'tags' | 'actors' ,
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

export type MetasType = 'tags' | 'actors' | 'categories';
export type MetaType = 'tag' | 'actor' | 'category';