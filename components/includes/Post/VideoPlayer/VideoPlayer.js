import React, { useEffect, useState, useContext,useRef } from 'react';


const VideoPlayer = props => {
    const playerElement = useRef(null)

    const WhatToRender = () => {

        if ( props.videoUrl) {
            return (
                <>
                    <video>
                        <source src={ props.videoUrl }/>
                    </video>
                </>
            )
        } else if (!props.videoUrl && props.videoEmbedCode) {
            return (
                <iframe src={ props.videoEmbedCode } frameBorder="0" width='640' height='360' scrolling="no"/>
            )
        }  else if (!props.videoUrl && !props.videoEmbedCode && props.videoScriptCode) {
            // if(playerElement.current){
            //     playerElement.current.innerHTML = props.videoScriptCode
            // }else return null
            return props.videoScriptCode
        } else return null
    }


        return (
            <div className='video-player'>
                <meta itemProp="name" content={ props.title }/>
                <meta itemProp="description" content={ props.description }/>
                <meta itemProp="duration" content={ props.duration }/>
                <meta itemProp="thumbnailUrl" content={ props.thumbnailUrl }/>
                <meta itemProp="embedURL" content={ props.embedURL }/>
                <meta itemProp="uploadDate" content={ props.uploadDate }/>
                <div ref={playerElement} className="responsive-player">
                    <WhatToRender/>
                    {/*<iframe src={ props.videoEmbedCode } frameBorder="0" width='640' height='360' scrolling="no"/>*/}
                </div>

            </div>

        );


};
export default VideoPlayer;