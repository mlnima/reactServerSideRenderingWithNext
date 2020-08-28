import React from 'react';
import './VideoEmbedCode.scss';
import { DelayInput } from 'react-delay-input'

const VideoEmbedCode = props => {
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <DelayInput element="textarea" className='textareaInput' name='videoEmbedCode' value={props.postData.videoEmbedCode} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null


};
export default VideoEmbedCode;