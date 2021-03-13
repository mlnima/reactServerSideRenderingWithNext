import React from 'react';
import Quality from "./Quality/Quality";
import TextInputWithUploadBtn from "./TextInputWithUploadBtn/TextInputWithUploadBtn";
import TextInput from "./TextInput/TextInput";
import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";
import RenderIframe from "./RenderIframe/RenderIframe";
import Duration from "./Duration/Duration";
import RatingAndViews from "./RatingAndViews/RatingAndViews";
import './PostInformation.scss';
import ImagePreview from "../ImagePreview/ImagePreview";
import ImageGallery from "./ImageGallery/ImageGallery";
import ProductPrice from "./ProductPrice/ProductPrice";

const PostInformation = props => {

    return (
        <div className='post-information  product-information admin-widget'>
            <TextInputWithUploadBtn type='thumbnail' onChangeHandler={props.onChangeHandler} thumbnailsType={true} postData={props.postData} name='mainThumbnail'
                                    title='Main thumbnail' rendering={true}/>
            <ImagePreview postData={props.postData}/>
            <Quality {...props} rendering={props.postData.postType === 'video'}/>
            <TextInputWithUploadBtn type='video' {...props} name='videoUrl' title='Video Url' rendering={props.postData.postType === 'video'}/>
            <TextInput {...props} name='videoEmbedCode' rendering={props.postData.postType === 'video'}/>
            <TextAreaComponent {...props} name='videoScriptCode' rendering={props.postData.postType === 'video'}/>
            <RenderIframe {...props} rendering={props.postData.postType === 'video'}/>
            <TextInputWithUploadBtn {...props} name='VideoTrailerUrl' title='Video Trailer Url' rendering={props.postData.postType === 'video'}/>
            <TextInput {...props} name='downloadLink' title='Download Link' rendering={props.postData.postType === 'video'}/>
            <Duration {...props}  rendering={props.postData.postType === 'video'}/>
            <ProductPrice {...props} rendering={props.postData.postType === 'product'}/>
            <TextInput {...props} name='shippingCost' rendering={props.postData.postType === 'product'}/>
            <ImageGallery {...props} rendering={props.postData.postType === 'product'}/>
            <RatingAndViews {...props} name='views' value={props.postData.views} rendering={true}/>
            <RatingAndViews {...props} name='likes' value={props.postData.likes} rendering={true}/>
            <RatingAndViews {...props} name='disLikes' value={props.postData.disLikes} rendering={true}/>
        </div>
    );
};
export default PostInformation;
