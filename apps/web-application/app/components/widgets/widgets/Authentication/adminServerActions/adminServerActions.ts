'use server'
import {revalidatePath, revalidateTag} from 'next/cache';
import {ReadonlyURLSearchParams} from "next/navigation";
import {IClearCache} from "typescript-types";

interface TClearCachesByServerAction extends IClearCache{
    path: string,
    segment: string | null,
    searchParams: ReadonlyURLSearchParams,
    params: any,
}


const clearCachesByServerAction = async ({path, segment, mode, searchParams, params}: TClearCachesByServerAction) => {


    const onlyTagsOptions = {
        'post': params?.identifier,
        'categories': 'metas',
        'actors': 'metas',
        'tags': 'metas',
        'category': 'posts',
        'actor': 'posts',
        'tag': 'posts',

    } as { [key: string]: string }


    if (mode === 'all') {
        revalidateTag('cacheItem')
        return
    }

    if (mode === 'settings') {
        revalidateTag('settings')
        return
    }

    if (mode === 'only' && !!segment) {
        //@ts-ignore
        if (!!onlyTagsOptions?.[segment]) {
            revalidateTag(onlyTagsOptions?.[segment])
        }

        return
    }


    if (mode === 'widgets') {
        revalidateTag('widgets')
        return
    }

    revalidatePath('/')
    revalidatePath('/[lang]')

    return
}

export default clearCachesByServerAction;


// const locales = process.env.NEXT_PUBLIC_LOCALES?.split(' ') || [];


// const options = {
//     'categories': [...locales.map(locales => `/${locales}/categories`), '/categories'],
//     'actors': [...locales.map(locales => `/${locales}/actors`), '/actors'],
//     'tags': [...locales.map(locales => `/${locales}/tags`), '/tags'],
//     'posts': [...locales.map(locales => `/${locales}/posts`), '/posts'],
//     'category': [...locales.map(locales => `/${locales}/category/[categoryId]`), '/category/[categoryId]'],
//     'actor': [...locales.map(locales => `/${locales}/actor/[actorId]`), '/actor/[actorId]'],
//     'tag': [...locales.map(locales => `/${locales}/tag/[tagId]`), '/tag/[tagId]'],
//     'editPost': [...locales.map(locales => `/${locales}/editPost/[_id]`), '/editPost/[_id]'],
//     'chatroom': [...locales.map(locales => `/${locales}/chatroom/[identifier]`), '/chatroom/[identifier]'],
//     'page': [...locales.map(locales => `/${locales}/page/[pageName]`), '/page/[pageName]'],
//     'post': [...locales.map(locales => `/${locales}/post/[postType]/[pageName]`), '/post/[postType]/[pageName]'],
//     'search': [...locales.map(locales => `/${locales}/search/[keyword]`), '/search/[keyword]'],
//     'user': [...locales.map(locales => `/${locales}/user/[username]`), '/user/[username]']
// }
// const options = {
//     'categories': ['/[lang]/categories','/categories'] ,
//     'actors': ['/[lang]/actors','/actors'] ,
//     'tags': ['/[lang]/tags','/tags'],
//     'posts':  ['/[lang]/posts','/posts'] ,
//     'category': ['/[lang]/category/[categoryId]','/category/[categoryId]'],
//     'actor':  ['/[lang]/actor/[actorId]','/actor/[actorId]'] ,
//     'tag': ['/[lang]/tag/[tagId]','/tag/[tagId]'] ,
//     'editPost': ['/[lang]/editPost/[_id]','/editPost/[_id]'],
//     'chatroom':['/[lang]/chatroom/[identifier]','/chatroom/[identifier]'],
//     'page':['/[lang]/page/[pageName]','/page/[pageName]'],
//     'post': ['/[lang]/post/[postType]/[pageName]','/post/[postType]/[pageName]'] ,
//     'search':['/[lang]/search/[keyword]','/search/[keyword]'],
//     'user': ['/[lang]/user/[username]','/user/[username]']
// }

