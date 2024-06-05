import { Translations } from "./Translations";
export interface Meta {
    parentId: string | undefined;
    coverImageUrl?: string;
    _id: string;
    name: string;
    description?: string;
    type: string;
    status?: string;
    imageUrl?: string;
    imageUrlLock?: boolean;
    translations?: Translations;
    count?: number;
    likes?: number;
    views?: number;
    rank?: number;
    additionalInfo?: {};
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=Meta.d.ts.map