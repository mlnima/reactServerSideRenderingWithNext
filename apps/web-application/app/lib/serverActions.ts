'use server';
import { IClearCache, PageParams } from '@repo/typescript-types';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';

interface TClearCachesByServerAction extends IClearCache {
    path: string;
    segment: string | null;
    searchParams: ReadonlyURLSearchParams;
    params: object;
}

export const clearACacheByTag = async (tag: string) => {
    try {
        console.log(`clearing cache => `,tag)
        revalidateTag(tag);
    } catch (error) {
        console.log(`error clearACacheByTag=> `, error);
    }
};

export const clearCachesByServerAction = async ({
    //path,
    //searchParams,
    segment,
    mode,
    params,
}: TClearCachesByServerAction) => {
    const onlyTagsOptions = {
        // @ts-expect-error: need fix
        post: params?.identifier,
        categories: 'metas',
        actors: 'metas',
        tags: 'metas',
        category: 'posts',
        actor: 'posts',
        tag: 'posts',
    } as { [key: string]: string };

    if (mode === 'all') {
        revalidateTag('cacheItem');
        revalidateTag('CPostViews');
        return;
    }

    if (mode === 'settings') {
        revalidateTag('CSetting');
        return;
    }

    if (mode === 'only' && segment) {
        if (onlyTagsOptions?.[segment]) {
            revalidateTag(onlyTagsOptions?.[segment]);
        }

        return;
    }

    if (mode === 'widgets') {
        revalidateTag('widgets');
        return;
    }

    revalidatePath('/');
    revalidatePath('/[lang]');

    return;
};


// class ServerActions{
//     static async clearCachesByServerAction({ path, segment, mode, searchParams, params }: TClearCachesByServerAction){
//         const onlyTagsOptions = {
//             post: params?.identifier,
//             categories: 'metas',
//             actors: 'metas',
//             tags: 'metas',
//             category: 'posts',
//             actor: 'posts',
//             tag: 'posts',
//         } as { [key: string]: string };
//
//         if (mode === 'all') {
//             revalidateTag('cacheItem');
//             return;
//         }
//
//         if (mode === 'settings') {
//             revalidateTag('settings');
//             return;
//         }
//
//         if (mode === 'only' && !!segment) {
//             //@ts-ignore
//             if (!!onlyTagsOptions?.[segment]) {
//                 revalidateTag(onlyTagsOptions?.[segment]);
//             }
//
//             return;
//         }
//
//         if (mode === 'widgets') {
//             revalidateTag('widgets');
//             return;
//         }
//
//         revalidatePath('/');
//         revalidatePath('/[lang]');
//
//         return;
//     }
//
//     static clearACacheByTag(tag:string){
//         revalidateTag(tag)
//     }
// }
//
//
//
//
// export default ServerActions