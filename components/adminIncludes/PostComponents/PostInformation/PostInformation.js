import React, {useEffect, useState, useContext, useRef} from 'react';
import IsInSlideShow from "./IsInSlideShow/IsInSlideShow";
import Quality from "./Quality/Quality";
import TextInputWithUploadBtn from "./TextInputWithUploadBtn/TextInputWithUploadBtn";
import TextInput from "./TextInput/TextInput";
import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";
import RenderIframe from "./RenderIframe/RenderIframe";
import Duration from "./Duration/Duration";
import RatingAndViews from "./RatingAndViews/RatingAndViews";
import './PostInformation.scss';
import ImagePreview from "../ImagePreview/ImagePreview";

const PostInformation = props => {
    const [state, setState] = useState({
        inSlideShow: false
    });

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

    return (
        <div className='post-information  product-information admin-widget'>
            <TextInputWithUploadBtn type='thumbnail' onChangeHandler={props.onChangeHandler} thumbnailsType={true} postData={props.postData}  name='mainThumbnail'
                                    title='Main thumbnail' rendering={true}/>
            <ImagePreview postData={props.postData}/>
            <IsInSlideShow {...props} onIsInSlideShowChangeHandler={ onIsInSlideShowChangeHandler } isChecked={ state.inSlideShow } rendering={true}/>

            <Quality {...props} rendering={props.postData.postType==='video'} />
            <TextInputWithUploadBtn type='video' {...props} name='videoUrl' title='Video Url' rendering={props.postData.postType==='video'} />
            <TextInput {...props} name='videoEmbedCode' rendering={props.postData.postType==='video'} />
            <TextAreaComponent {...props} name='videoScriptCode' rendering={props.postData.postType==='video'}/>
            <RenderIframe {...props} rendering={props.postData.postType==='video'}/>
            <Duration {...props} onDurationChangeHandler={ onDurationChangeHandler } rendering={props.postData.postType==='video'}/>
            <RatingAndViews {...props} name={ 'views' } value={state.views||0} rendering={true} />
            <RatingAndViews {...props} name={ 'likes' } value={state.likes||0} rendering={true} />
            <RatingAndViews {...props} name={ 'disLikes' } value={state.disLikes||0} rendering={true} />
            <TextInputWithUploadBtn {...props} name='VideoTrailerUrl' title='Video Trailer Url' rendering={props.postData.postType==='video'} />
            <TextInput {...props} name='downloadLink' title='Download Link' rendering={props.postData.postType==='video'} />
        </div>
    );
};
export default PostInformation;
