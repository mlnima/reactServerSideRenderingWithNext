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
            videoData.title = videoPageDom.querySelector('h1').textContent
            const DescriptionElementData = videoPageDom.querySelector('.ab-info').querySelector('p').textContent
            DescriptionElementData ? videoData.description=DescriptionElementData :null;
            // videoData.description = videoPageDom.querySelector('.ab-info').querySelector('p').textContent
            const splitByDash = url.split('-')
            const videoId = splitByDash[splitByDash.length - 1]
            videoData.videoEmbedCode = 'https://xhamster.com/embed/' + videoId
            const playerImageElement = videoPageDom.querySelector('#player-container')?.querySelector('noscript')?.outerHTML
            const noScriptTag = new JSDOM(playerImageElement)?.window?.document;
            videoData.mainThumbnail = noScriptTag?.querySelector('video')?.getAttribute('poster') || ''
            videoData.source = url
            const categoriesContainer1 = videoPageDom.querySelector('.collapsable-list')
            const categoriesContainer2 = videoPageDom.querySelector('#video-tags-list-container')?.querySelector('ul')
            const categoriesContainer = (categoriesContainer1 || categoriesContainer2 )?.querySelectorAll('li')



            if (!!categoriesContainer){
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
            }


            //scrap duration from js script by regex
            const durationScript = videoPageDom?.querySelector('#initials-script')?.textContent;
            const durationsByRegex = durationScript ? durationScript.match(/(?<="duration":\s*).*?(?=\s*,)/gs) :null;
            let scrapedDuration = 0

            if (!!durationsByRegex && Array.isArray(durationsByRegex)){
                scrapedDuration = durationsByRegex[0]
            }else if (!!durationsByRegex && typeof durationsByRegex ==='string'){
                scrapedDuration = durationsByRegex
            }
            if (scrapedDuration){
                videoData.duration = convertSecondsToTimeString(scrapedDuration)
            }


            return videoData
        })
    } catch (error) {
        console.log(error)
    }

}

export default xHamster;