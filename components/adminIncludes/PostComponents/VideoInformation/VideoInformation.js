import React, { useEffect, useState, useContext } from 'react';
import IsInSlideShow from "./IsInSlideShow/IsInSlideShow";
import Quality from "./Quality/Quality";
import './VideoInformation.scss'
import VideoUrls from "./VideoUrls/VideoUrls";
import VideoEmbedCode from "./VideoEmbedCode/VideoEmbedCode";
import Duration from "./Duration/Duration";
import ViewsLikesDisLikes from "./ViewsLikesDisLikes/ViewsLikesDisLikes";
import TextInputWithUploadBtn from "./TextInputWithUploadBtn/TextInputWithUploadBtn";
import { AppContext } from "../../../../context/AppContext";
import TextInput from "./TextInput/TextInput";
import RenderIframe from "./RenderIframe/RenderIframe";
import ImagePreview from "./ImagePreview/ImagePreview";

const VideoInformation = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        inSlideShow: false
    });

    const onSaveChanges = () => {
        contextData.dispatchEditingPostData({ ...contextData.editingPostData, ...state })
    };

    const onchangeHandler = e => {
        // setState({
        //     ...state,
        //     [e.target.name]: e.target.value
        // })
    };
    const onDurationChangeHandler = (value) => {

        setState({
            ...state,
            duration: value
        })
    };

    const onIsInSlideShowChangeHandler = (e) => {

        setState({
            ...state,
            inSlideShow: e
        })
    };

    if (props.postData.postType === 'video') {
        return (
            <div className='VideoInformation'>
                <div className="saveBtn">
                    <button className='SaveVideoDataBtn' onClick={ () => onSaveChanges() }>Save Video Data</button>
                </div>

                <IsInSlideShow {...props} onChangeHandler={ onIsInSlideShowChangeHandler } isChecked={ state.inSlideShow }/>



                <Quality {...props} />
                <TextInputWithUploadBtn {...props} name='videoTrailerUrl' title='Video Url' />
                <VideoEmbedCode {...props} name='videoEmbedCode' />
                <RenderIframe {...props}/>
                <Duration {...props} onDurationChangeHandler={ onDurationChangeHandler }/>
                <ViewsLikesDisLikes {...props} name={ 'views' } value={state.views||0} />
                <ViewsLikesDisLikes {...props} name={ 'likes' } value={state.likes||0} />
                <ViewsLikesDisLikes {...props} name={ 'disLikes' } value={state.disLikes||0} />
                <TextInputWithUploadBtn {...props} name='VideoTrailerUrl' title='Video Trailer Url' />
                <TextInputWithUploadBtn {...props} name='mainThumbnail' title='Main thumbnail' />
                <ImagePreview {...props}/>
                <TextInput {...props} name='downloadLink' title='Download Link' />
                <div className="saveBtn">
                    <button className='SaveVideoDataBtn' onClick={ () => onSaveChanges() }>Save Video Data</button>
                </div>
            </div>
        );
    } else {
        return (
            <h3>This Post Type Does not Support this Feature </h3>
        )
    }

};
export default VideoInformation;