// @ts-nocheck
import got from 'got'
import jsdom from 'jsdom'
import {convertSecondsToTimeString} from 'custom-util'

const {JSDOM} = jsdom;

const xHScrapper = async (url) => {
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


            const initialsScriptContent = initialsScriptAsText ? initialsScriptAsText.replace('window.initials=', '') : null;
            const videoDataJson = initialsScriptContent ? initialsScriptContent.slice(0, -1) : null;

            if (videoDataJson) {

                try {
                    const parsedObject = eval('(' + videoDataJson + ')');
                    const videoModel = parsedObject?.["videoModel"]

                    videoData.quality = videoModel?.isUHD ? '4K' : videoModel?.isHD ? 'HD' : 'SD'
                    videoData.duration = videoModel?.duration ? convertSecondsToTimeString(videoModel?.duration) : '00:00'
                    videoData.videoTrailerUrl = videoModel?.trailerURL || ''
                    videoData.mainThumbnail = videoModel?.thumbURL || ''
                    videoData.title = videoModel?.title || videoPageDom?.querySelector('h1')?.textContent
                    videoData.description = videoModel?.description || ''
                    videoData.videoEmbedCode = `https://xhamster.com/embed/${videoModel?.idHashSlug || videoModel?.id || ''}`
                    videoData.source = videoModel?.pageURL || url
                } catch (error) {
                    console.log('Error Parsing VideoData=> ', error)
                }

            }

            const categoriesContainer1 = videoPageDom.querySelector('.collapsable-list')
            const categoriesContainer2 = videoPageDom.querySelector('#video-tags-list-container')?.querySelector('ul')
            const categoriesContainer = (categoriesContainer1 || categoriesContainer2)?.querySelectorAll('li')

            if (!!categoriesContainer) {
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

export default xHScrapper;