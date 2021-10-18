import React, {useState} from 'react';
import {useSelector} from "react-redux";

const RenderIframe = props => {

    const videoEmbedCode = useSelector((state) => state.adminPanelPosts.post?.videoEmbedCode);

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                </div>
                <div className="editor">
                    {videoEmbedCode?<iframe src={videoEmbedCode}/>:null}
                </div>
            </div>
        )
    }else return null


};
export default RenderIframe;