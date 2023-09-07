'use server'
import {revalidatePath} from 'next/cache';

interface TClearCachesByServerAction {
    path?: string,
    segment: 'category' |
        'actor' |
        'tag' |
        'editPost' |
        'chatroom'|
        'page' |
        'post' |
        'search' |
        null
}

const clearCachesByServerAction = async ({path, segment}: TClearCachesByServerAction) => {

    console.log('path=> ', path)
    console.log('segment=> ', segment)
    if (path) {
        const segmentOptions = {
            'category': '/category/[categoryId]',
            'actor': '/category/[actorId]',
            'tag': '/product/[tagId]',
            'editPost': '/editPost/[_id]',
            'chatroom': '/chatroom/[identifier]',
            'page': '/page/[pageName]',
            'post': '/post/[postType]/[pageName]',
            'search': '/search/[keyword]',
            'user': '/user/[username]'
        }

        if (!!segment && !!segmentOptions?.[segment]) {
            console.log('segmentOptions?.[segment]=> ', segmentOptions?.[segment])
            revalidatePath(segmentOptions?.[segment])
        }

        revalidatePath(path)

    } else {
        revalidatePath('/')
        revalidatePath('/[lang]')
    }

}

export default clearCachesByServerAction;