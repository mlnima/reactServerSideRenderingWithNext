'use client'
import {clientAPIRequestViewPost} from "api-requests";
import React, {FC, useMemo, useRef, useState} from 'react';
import './CardImageRendererUseClient.scss'
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {setActiveVideoTrailerId} from "@store/reducers/postsReducers/postsReducer";
// import Csr from "@components/global/Csr";
import Image from "next/image";
// import {tr} from "date-fns/locale";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import viewPostAction from "@store/reducers/postsReducers/viewPostAction";

const fallbackImage = '/asset/images/default/no-image-available.png'

interface CardImageNextPropTypes {
    imageUrl: string | undefined,
    mediaAlt: undefined | string,
    aspectRatio?: string | undefined,
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined,
    submitPostView?: boolean,
    videoTrailerUrl?: string,
    postId?: string,
    index: number,
    isNextIImageAllowed: boolean,
    viewPostRequest?: boolean,
    overlayShadow?: boolean
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
         index,
         isNextIImageAllowed = false,
         viewPostRequest,
         overlayShadow
     }) => {
        const [gotError, setGotError] = useState(false)

        const targetImageUrl = useMemo(() => {
            return gotError ? fallbackImage : imageUrl
        }, [gotError, postId]) as string | StaticImport


        const activeVideoTrailerId = useAppSelector(({posts}) => posts.activeVideoTrailerId)
        const dispatch = useAppDispatch()
        const [loadingAnimationOver, setLoadingAnimationOver] = useState(false)
        const videoTrailerRef = useRef<HTMLVideoElement>(null)
        const imageRef = useRef<HTMLImageElement>(null)

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
            // console.log('error=> ',error)
            if (imageRef?.current) {
                imageRef.current.src = fallbackImage
            }
        }

        const onNextImageErrorHandler = (e: any) => {
            setGotError(true)
        }

        return (
            <div className={`card-image-wrapper`}       style={{
                aspectRatio: aspectRatio || '16/9'
            }}
                 onClick={() => {
                     if (viewPostRequest && !!postId) {
                         dispatch(viewPostAction(postId))
                     }
                 }}>
                {(!!videoTrailerUrl && activeVideoTrailerId === postId) && <div className="trailer-loading"/>}
                {/*<Csr>*/}
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
                    <>
                        {(!!imageUrl && isNextIImageAllowed) ?
                            <Image src={targetImageUrl}
                                   //@ts-ignore
                                   // key={targetImageUrl}
                                   ref={imageRef}
                                   alt={mediaAlt || ''}
                                   width={320}
                                   height={240}
                                   onClick={onClickHandler}
                                   onMouseEnter={() => onHoverHandler()}
                                   onTouchStart={() => onHoverHandler()}
                                   onTouchEnd={onUnHoverHandler}
                                   onError={e => onNextImageErrorHandler(e)}
                                   loading={index > 3 ? 'lazy' : 'eager'}
                                   style={{
                                       objectFit: objectFit || 'contain',
                                       aspectRatio: aspectRatio || '16/9',

                                   }}
                                   className={`card-image w-full aspect-${aspectRatio || 'video'} object-${objectFit || 'contain'}`}
                            /> :
                            <img src={imageUrl || fallbackImage}
                                 ref={imageRef}
                                 alt={mediaAlt || ''}
                                 loading={index > 3 ? 'lazy' : 'eager'}
                                 onClick={onClickHandler}
                                 onMouseEnter={() => onHoverHandler()}
                                 onTouchStart={() => onHoverHandler()}
                                 onTouchEnd={onUnHoverHandler}
                                 onError={error => onImageErrorHandler(error)}
                                 style={{
                                     objectFit: objectFit || 'contain',
                                     aspectRatio: aspectRatio || '16/9'
                                 }}
                                 className={`card-image`}
                            />

                        }
                        {overlayShadow &&
                            <div className={'cardOverlay'}
                                 style={{
                                     position: 'absolute',
                                     width:'100%',
                                     height: '100%',
                                     top: 0,
                                     left: 0,
                                     background: 'linear-gradient(to bottom,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%)'
                                 }}
                            />
                        }

                    </>
                }
                {/*</Csr>*/}
            </div>
        )

    };

export default CardImageRendererUseClient;


// <img src={imageUrl||fallbackImage}
//      ref={imageRef}
//      alt={mediaAlt || ''}
//      loading={index > 3 ? 'lazy' : 'eager'}
//      onClick={onClickHandler}
//      onMouseEnter={() => onHoverHandler()}
//      onTouchStart={() => onHoverHandler()}
//      onTouchEnd={onUnHoverHandler}
//      onError={error=>onImageErrorHandler(error)}
//      style={{
//          objectFit: objectFit || 'contain',
//          aspectRatio: aspectRatio || '16/9'
//      }}
//      className={`card-image`}
// />