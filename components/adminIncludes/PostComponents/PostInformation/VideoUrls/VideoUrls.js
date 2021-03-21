import React,{useEffect,useState} from 'react';


const VideoUrls = () => {

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Video URL</p>
                </div>
                <div className="editor">
                    <input className='textInput'/>
                </div>
            </div>
        );
    }else return null

};
export default VideoUrls;