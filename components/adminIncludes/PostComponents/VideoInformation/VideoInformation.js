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

    // useEffect(() => {
    //     console.log(state)
    // }, [ state ]);

    const onSaveChanges = () => {
        contextData.dispatchEditingPostData({ ...contextData.editingPostData, ...state })
    };

    const onchangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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

    if (contextData.editingPostData.postType === 'video') {
        return (
            <div className='VideoInformation'>
                <div className="saveBtn">
                    <button className='SaveVideoDataBtn' onClick={ () => onSaveChanges() }>Save Video Data</button>
                </div>

                <IsInSlideShow onChangeHandler={ onIsInSlideShowChangeHandler } isChecked={ state.inSlideShow }/>
                <Quality onChangeHandler={ onchangeHandler }/>
                <TextInputWithUploadBtn name='videoTrailerUrl' title='Video Url' onChangeHandler={ onchangeHandler }/>
                <VideoEmbedCode name='videoEmbedCode' onChangeHandler={ onchangeHandler }/>
                <RenderIframe/>
                <Duration onDurationChangeHandler={ onDurationChangeHandler }/>
                <ViewsLikesDisLikes name={ 'views' } onChangeHandler={ onchangeHandler }/>
                <ViewsLikesDisLikes name={ 'likes' } onChangeHandler={ onchangeHandler }/>
                <ViewsLikesDisLikes name={ 'disLikes' } onChangeHandler={ onchangeHandler }/>
                <TextInputWithUploadBtn name='VideoTrailerUrl' title='Video Trailer Url' onChangeHandler={ onchangeHandler }/>
                <TextInputWithUploadBtn name='mainThumbnail' title='Main thumbnail' onChangeHandler={ onchangeHandler }/>
                <ImagePreview/>
                <TextInput name='downloadLink' title='Download Link' onChangeHandler={ onchangeHandler }/>
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