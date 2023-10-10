import got from 'got'
import jsdom from 'jsdom'
import {Post} from "typescript-types";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const {JSDOM} = jsdom;

interface IProps {
    relatedBy: string,
    page ?:number
}

interface ISearchAndScrapLink{
    keyword: string,
    page ?:number
}

const searchAndScrapLink = async ({keyword, page}:ISearchAndScrapLink) => {
    try {
        let cards = []
        const targetUrl = `https://xhamster.com/search/${keyword}${page?`?page=${page}`:''}`
        console.log('targetUrl=> ',targetUrl)
        return await got(targetUrl).then(async searchPageData => {
            const searchPageDom = new JSDOM(searchPageData.body.toString()).window.document;
            const allVideoCards = searchPageDom.querySelectorAll('.video-thumb')
            for await (const card of allVideoCards) {

                const UHDQualityElement = card.querySelector('.thumb-image-container__icon--uhd')
                const HDQualityElement = card.querySelector('.thumb-image-container__icon--hd')
                const durationElement = card.querySelector('span[data-role="video-duration"]');
                const cardData = {
                    source: card.querySelector('a')?.getAttribute('href'),
                    mainThumbnail: card.querySelector('a')?.querySelector('img')?.getAttribute('src'),
                    videoTrailerUrl: card.querySelector('a')?.getAttribute('data-previewvideo'),
                    views: card.querySelector('.video-thumb-views')?.textContent,
                    quality: !!UHDQualityElement ? '4K' : !!HDQualityElement ? 'HD' : 'SD',
                    duration: durationElement?.textContent,
                    title: card.querySelector('.video-thumb-info')?.querySelector('.video-thumb-info__name')?.textContent
                }

                if (cardData?.duration && cardData?.videoTrailerUrl&& cardData?.mainThumbnail){
                    cards = [...cards, cardData]
                }

            }

            return cards
        }).catch(error =>{
            console.log('error on xh searchAndScrapLink got catch',error)

        })


    } catch (error) {
        console.log('error on xh searchAndScrapLink')
        return []
    }


}


const xHSimilarFinder = async ({relatedBy,page}: IProps) => {
    try {
        return await searchAndScrapLink({keyword:relatedBy,page} )
    } catch (error) {
        console.log('error on xh xHSimilarFinder')
        return []
    }
}


export default xHSimilarFinder;