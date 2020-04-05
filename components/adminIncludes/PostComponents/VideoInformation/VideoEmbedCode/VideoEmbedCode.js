import React from 'react';
import './VideoEmbedCode.scss';

const VideoEmbedCode = props => {

        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <textarea value={props.postData.videoEmbedCode}  className='textareaInput' name='videoEmbedCode' onChange={e=>props.onChangeHandler(e)}/>
                </div>
            </div>
        );

};
export default VideoEmbedCode;