import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import _qualityConvertor from "../asset/_qualityConvertor";
import {Post} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons/faVideoSlash";
// import VideoPostCardTrailer from "../asset/VideoPostCardTrailer";
import CardTitle from "../asset/CardTitle/CardTitle";
const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../asset/CardDuration/CardDuration'))
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))

interface VideoPostCardPropTypes {
    title: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    views: number,
    rating: number,
    index: number,
    targetLink: string,
    post: Post,
}

const LearnPostCard: FC<VideoPostCardPropTypes> =
    ({
         post,
         title,
         postUrl,
         views,
         rating,
         numberOfCardsPerRowInMobile,
         targetLink,
         index
     }) => {

        // const [hover, setHover] = useState(false)
        const hover = false

        const hoverHandler = (status: boolean) => {
            // setHover(status)
        }


//w-1/${numberOfCardsPerRowInMobile} md:w-64
        return (
            <article className={`post-card w-1/${numberOfCardsPerRowInMobile} md:w-64`}>
                <div className={'card-media relative text-secondary-text-color'}>
                    <Link href={postUrl} className={'card-link'} title={title} target={targetLink} prefetch={false}>
                        {((!hover || (hover && !post?.videoTrailerUrl)) && !!post.mainThumbnail) &&
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile} />
                        }

                        {/*{((!hover || (hover && !post?.videoTrailerUrl)) && !post.mainThumbnail) &&*/}
                        {/*    <TextToCanvasImage title={title}*/}
                        {/*                       numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}*/}
                        {/*                       cardWidth={cardWidth}/>*/}
                        {/*}*/}


                        {/*{(hover && !!post?.videoTrailerUrl) &&*/}
                        {/*    <VideoPostCardTrailer videoTrailerUrl={post?.videoTrailerUrl}*/}
                        {/*                          hover={hover}*/}
                        {/*                          numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}*/}
                        {/*                          hoverHandler={hoverHandler}*/}
                        {/*                          cardWidth={cardWidth}/>*/}
                        {/*}*/}


                        {!!post?.quality &&
                            <CardQuality quality={_qualityConvertor(post?.quality)}/>}

                        {!!post?.duration &&
                            <CardDuration duration={post?.duration}/>}


                    </Link>
                    {!!post?.videoTrailerUrl &&
                        <FontAwesomeIcon className={` mobile-play-trailer-button absolute w-11 h-11 md:w-6 md:h-6 opacity-50
                          bg-primary-background-color text-primary-text-color p-1 m-0 flex items-center 
                          top-0.5 left-0.5 rounded-full`}
                          onClick={() => hoverHandler(!hover)}
                          icon={hover ? faVideoSlash : faVideo}
                        />
                    }
                </div>
                <CardTitle title={title} targetLink={targetLink} url={postUrl}/>

                {(!!views || !!rating) && (
                    <div className={`card-under-media-info flex ${(!!views &&!!rating) ? 'justify-between' : 'justify-start'} `}>
                        {!!views && <CardViews views={views}/>}
                        {!!rating && <CardRating rating={rating}/>}
                    </div>
                )}


            </article>
        )
    };
export default LearnPostCard

