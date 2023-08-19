'use client'
import {clientAPIRequestViewPost} from "api-requests";
import React, {FC, useRef, useState} from 'react';
import './CardImageRendererUseClient.styles.scss'
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setActiveVideoTrailerId} from "@store/reducers/postsReducers/postsReducer";

interface CardImageNextPropTypes {
    imageUrl: string | undefined,
    mediaAlt: undefined | string,
    aspectRatio?: string | undefined,
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined,
    submitPostView?: boolean,
    videoTrailerUrl?: string,
    postId?: string,
    index: number
}

const CardImageRendererUseClient: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         aspectRatio,
         objectFit,
         submitPostView,
         videoTrailerUrl,
         postId,
         index
     }) => {

        const activeVideoTrailerId = useAppSelector(({posts}) => posts.activeVideoTrailerId)
        const dispatch = useAppDispatch()
        const [loadingAnimationOver, setLoadingAnimationOver] = useState(false)
        const videoTrailerRef = useRef<HTMLVideoElement>(null)
        const imageRef = useRef<HTMLImageElement>(null)
        const fallbackImage = '/asset/images/default/no-image-available.png'

        const onClickHandler = async () => {
            if (submitPostView && postId) {
                await clientAPIRequestViewPost(postId)
            }
        }

        const playTrailer = () => {
            try {
                if (videoTrailerRef?.current) {
                    setTimeout(() => {
                        videoTrailerRef?.current?.play()
                    }, 1000)
                }
            } catch (error) {

            }
        }

        const onHoverHandler = async () => {
            try {
                dispatch(setActiveVideoTrailerId(postId))
                setTimeout(() => {
                    setLoadingAnimationOver(true)
                }, 1000)
            } catch (error) {

            }
        }

        const onUnHoverHandler = async () => {
            try {
                dispatch(setActiveVideoTrailerId(null))
            } catch (error) {

            }
        }

        const onCanPlayHandler = () => {
            if (activeVideoTrailerId === postId) {
                playTrailer()
            }
        }

        const onImageErrorHandler = (error: any) => {
            console.log('error=> ',error)
            if (imageRef?.current){
               imageRef.current.src = fallbackImage
            }
        }

        return (
            <div className={`card-image-wrapper`} style={{
                aspectRatio: aspectRatio || '16/9'
            }}>
                {(!!videoTrailerUrl && activeVideoTrailerId === postId) && <div className="trailer-loading"/>}
                {(!!videoTrailerUrl && activeVideoTrailerId === postId && loadingAnimationOver) ?
                    <video ref={videoTrailerRef}
                           muted
                           loop={false}
                           onEnded={() => onHoverHandler()}
                           onCanPlay={onCanPlayHandler}
                           onMouseLeave={onUnHoverHandler}
                           onTouchEnd={onUnHoverHandler}
                           playsInline
                           style={{
                               objectFit: objectFit || 'contain',
                               aspectRatio: aspectRatio || '16/9'
                           }}
                           className={'video-card-trailer'}>
                        <source src={videoTrailerUrl}/>
                        Sorry, your browser doesn't support embedded videos.
                    </video> :
                    <img src={imageUrl||fallbackImage}
                         ref={imageRef}
                         alt={mediaAlt || ''}
                         loading={index > 1 ? 'lazy' : 'eager'}
                         onClick={onClickHandler}
                         onMouseEnter={() => onHoverHandler()}
                         onTouchStart={() => onHoverHandler()}
                         onTouchEnd={onUnHoverHandler}
                         onError={error=>onImageErrorHandler(error)}
                         style={{
                             objectFit: objectFit || 'contain',
                             aspectRatio: aspectRatio || '16/9'
                         }}
                         className={`card-image`}
                    />
                }
            </div>
        )

    };

export default CardImageRendererUseClient;

