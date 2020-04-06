import React from 'react';
import './VideoEmbedCode.scss';
import { DelayInput } from 'react-delay-input'

const VideoEmbedCode = props => {

        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <DelayInput element="textarea" className='textareaInput' name='videoEmbedCode' value={props.postData.videoEmbedCode} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                    {/*<textarea value={props.postData.videoEmbedCode}  className='textareaInput' name='videoEmbedCode' onChange={e=>props.onChangeHandler(e)}/>*/}
                </div>
            </div>
        );

};
export default VideoEmbedCode;