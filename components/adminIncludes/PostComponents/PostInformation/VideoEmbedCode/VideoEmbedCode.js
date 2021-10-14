import React from 'react';

const VideoEmbedCode = props => {
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <textarea  className='textareaInput' name='videoEmbedCode' value={props.postData.videoEmbedCode} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null


};
export default VideoEmbedCode;