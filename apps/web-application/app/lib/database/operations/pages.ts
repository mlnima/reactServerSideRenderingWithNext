'use server';
import { connectToDatabase,pageSchema } from '@repo/db';
import { Document } from 'mongoose';
import { unstable_cacheTag as cacheTag } from 'next/cache';


export const getPage = async ({pageName}: {pageName:string}) => {
    try {
        'use cache';
        await connectToDatabase('getPage');
        const pageData  = await pageSchema.findOne({ pageName }).lean({
            virtuals: true,
            transform: (doc: Document) => {
                if (doc?._id) {
                    doc._id = doc._id.toString();
                }
                return doc;
            },
        });
        cacheTag('cacheItem', `CPage-${pageName}`);
        return pageData;
    }catch (error){
        console.error(`getPage => `, error);
    }
}