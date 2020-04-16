import React, { useEffect, useState, useContext, useRef } from 'react';
import './VideoPlayer.scss';

const VideoPlayer = props => {
    const playerElement = useRef(null)
//frameBorder="0" width='640' height='360' scrolling="no"
    const WhatToRender = () => {
        if (props.videoUrl) {
            return (
                <video className='video-player-video-type' controls controlsList=" nodownload" poster={props.mainThumbnail } preload="none">
                    <source src={ props.videoUrl }/>
                </video>

            )
        } else if (props.videoEmbedCode && !props.videoUrl) {
            return (
                <iframe src={ props.videoEmbedCode } frameBorder="0" width='640' height='360' scrolling="no"/>
            )
        }
        if (!props.videoUrl && !props.videoEmbedCode && props.videoScriptCode) {
            // if(playerElement.current){
            //     playerElement.current.innerHTML = props.videoScriptCode
            // }else return null
            return props.videoScriptCode
        } else return null
    }

    useEffect(() => {
        console.log(props)
    }, [ props ]);
    return (
        <div className='video-player'>
            <meta itemProp="name" content={ props.title }/>
            <meta itemProp="description" content={ props.description }/>
            <meta itemProp="duration" content={ props.duration }/>
            <meta itemProp="thumbnailUrl" content={ props.mainThumbnail }/>
            <meta itemProp="embedURL" content={ props.videoUrl || props.videoEmbedCode  }/>
            <meta itemProp="uploadDate" content={ props.lastModify }/>
            <div ref={ playerElement } className="responsive-player">
                <WhatToRender/>
                {/*<iframe src={ props.videoEmbedCode } frameBorder="0" width='640' height='360' scrolling="no"/>*/ }
            </div>

        </div>

    );

};
export default VideoPlayer;