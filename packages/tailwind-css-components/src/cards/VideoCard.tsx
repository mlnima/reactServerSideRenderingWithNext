import React from 'react';
import {Post} from "typescript-types/dist/src/Post";
import Link from 'next/link';
import CardImage from "./components/CardImage";
import CardQuality from "./components/CardQuality";
import CardDuration from "./components/CardDuration";
import CardTitle from "./components/CardTitle";
import CardViews from "./components/CardViews";

interface IProps {
    duration: string,
    postUrl: string,
    playTrailer: () => void,
    title: string,
    views: number,
    cardWidth: number,
    numberOfCardsPerRowInMobile: number,
    post: Post
}

const VideoCard: React.FC<IProps> = ({
                                         playTrailer,
                                         title,
                                         views,
                                         post,
                                         cardWidth,
                                         numberOfCardsPerRowInMobile,
                                         postUrl
                                     }) => {

    return (
        <article className={`overflow-hidden rounded-lg shadow-lg`} style={{}}>

            <Link href={postUrl} className={'w-full'}>
                <div className={'relative w-full aspect-w-16 aspect-h-9'}>
                    <CardImage imageUrl={post.mainThumbnail}/>
                    <CardQuality quality={post.quality}/>
                    <CardDuration duration={post.duration}/>
                </div>
            </Link>

            <header className={`flex items-center justify-between leading-tight p-2 md:p-4`}>
                <CardTitle title={title} postUrl={postUrl}/>
                <CardViews views={views} />
            </header>
            <footer className={`flex items-center justify-between leading-none p-2 md:p-4`}>

                <Link className="no-underline text-grey-darker hover:text-red-dark" href={postUrl}>
                    <span className="hidden">Like</span>
                    <i className="fa fa-heart"></i>
                </Link>
            </footer>
        </article>
    );
}

export default VideoCard;
