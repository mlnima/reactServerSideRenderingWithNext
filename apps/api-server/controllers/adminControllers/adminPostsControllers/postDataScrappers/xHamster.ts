// @ts-nocheck
import got from 'got'
import jsdom from 'jsdom'
import convertSecondsToTimeString from 'custom-util/src/date-utils/convertSecondsToTimeString'

const {JSDOM} = jsdom;

const xHamster = async (url) => {
    try {
        return await got(url).then(async videoPageData => {
            const videoPageDom = new JSDOM(videoPageData.body.toString()).window.document;
            let videoData = {
                tags: [],
                categories: [],
                actors: [],
                postType: "video",
                sourceSite: "xhamster",
            }

            const initialsScript = videoPageDom?.querySelector('#initials-script');
            const initialsScriptAsText = initialsScript?.textContent;
            const videoDataJson =initialsScriptAsText ? initialsScriptAsText.match(/(?<="videoModel":\s*).*?(?=\s*,"videoEntity":)/gs) :null;
            if (videoDataJson){
                const parsedJsonData = JSON.parse(videoDataJson)
                videoData.quality = parsedJsonData?.isUHD ? '4K' : parsedJsonData?.isHD ? 'HD' : 'SD'
                videoData.duration = parsedJsonData?.duration ? convertSecondsToTimeString(parsedJsonData?.duration) : '00:00'
                videoData.videoTrailerUrl = parsedJsonData?.trailerURL || ''
                videoData.mainThumbnail = parsedJsonData?.thumbURL || ''
                videoData.title =parsedJsonData?.title || videoPageDom?.querySelector('h1')?.textContent
                videoData.description = parsedJsonData?.description || ''
                videoData.videoEmbedCode = `https://xhamster.com/embed/${parsedJsonData?.idHashSlug || parsedJsonData?.id || '' }`
                videoData.source = parsedJsonData?.pageURL || url

            }

            const categoriesContainer1 = videoPageDom.querySelector('.collapsable-list')
            const categoriesContainer2 = videoPageDom.querySelector('#video-tags-list-container')?.querySelector('ul')
            const categoriesContainer = (categoriesContainer1 || categoriesContainer2 )?.querySelectorAll('li')

            if (!!categoriesContainer){
                for await (let categoriesContainerItem of categoriesContainer) {
                    const categoriesItem = categoriesContainerItem.querySelector('a').textContent.trim()
                    const categoriesItemUrl = categoriesContainerItem.querySelector('a').getAttribute('href')
                    if (categoriesItemUrl) {
                        if (categoriesItemUrl?.includes('/pornstars/')) {
                            videoData.actors = [
                                ...videoData.actors,
                                {
                                    name: categoriesItem,
                                    type: "actors"
                                }
                            ]
                        } else if (categoriesItemUrl?.includes('/categories/')) {
                            videoData.categories = [
                                ...videoData.categories,
                                {
                                    name: categoriesItem,
                                    type: "categories"
                                }
                            ]
                        } else if (categoriesItemUrl?.includes('/tags/')) {
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
            }

            return videoData
        })
    } catch (error) {
        console.log(error)
    }

}

export default xHamster;