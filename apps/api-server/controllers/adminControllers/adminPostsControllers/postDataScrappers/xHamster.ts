// @ts-nocheck
import got from 'got'
import jsdom from 'jsdom'

const {JSDOM} = jsdom;

const xHamster = async (url) => {
    try {
        //     console.log('Clog:',url)
        return await got(url).then(async videoPageData => {
            // console.log('Clog:',videoPageData.body.toString())
            const videoPageDom = new JSDOM(videoPageData.body.toString()).window.document;
            let videoData = {
                tags: [],
                categories: [],
                actors: [],
                // status: "published",
                postType: "video",
                sourceSite: "xhamster",
                // likes: 0,
                // disLikes: 0,
                // views: 0,
            }
            videoData.title = videoPageDom.querySelector('h1').textContent
            videoData.description = videoPageDom.querySelector('.ab-info').querySelector('p').textContent
            const splitByDash = url.split('-')
            const videoId = splitByDash[splitByDash.length - 1]
            videoData.videoEmbedCode = 'https://xhamster.com/embed/' + videoId
            const playerImageElement = videoPageDom.querySelector('#player-container')?.querySelector('noscript')?.outerHTML
            const noScriptTag = new JSDOM(playerImageElement)?.window?.document;
            videoData.mainThumbnail = noScriptTag?.querySelector('video')?.getAttribute('poster') || ''
            videoData.source = url
            const categoriesContainer = videoPageDom.querySelector('.collapsable-list').querySelectorAll('li')
            for await (let categoriesContainerItem of categoriesContainer) {
                const categoriesItem = categoriesContainerItem.querySelector('a').textContent.trim()
                const categoriesItemUrl = categoriesContainerItem.querySelector('a').getAttribute('href')
                if (categoriesItemUrl) {
                    if (categoriesItemUrl.includes('/pornstars/')) {
                        videoData.actors = [
                            ...videoData.actors,
                            {
                                name: categoriesItem,
                                type: "actors"
                            }
                        ]
                    } else if (categoriesItemUrl.includes('/categories/')) {
                        videoData.categories = [
                            ...videoData.categories,
                            {
                                name: categoriesItem,
                                type: "categories"
                            }
                        ]
                    } else if (categoriesItemUrl.includes('/tags/')) {
                        videoData.tags = [
                            ...videoData.tags,
                            {
                                name: categoriesItem,
                                type: "tags"
                            }
                        ]
                    }
                }

            }
            return videoData
        })
    } catch (error) {
        console.log(error)
    }

}

export default xHamster;