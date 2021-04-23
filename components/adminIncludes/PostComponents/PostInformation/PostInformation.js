import React from 'react';
import Quality from "./Quality/Quality";
import TextInputWithUploadBtn from "./TextInputWithUploadBtn/TextInputWithUploadBtn";
import TextInput from "./TextInput/TextInput";
import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";
import RenderIframe from "./RenderIframe/RenderIframe";
import Duration from "./Duration/Duration";
import RatingAndViews from "./RatingAndViews/RatingAndViews";
import ImagePreview from "../ImagePreview/ImagePreview";
import ImageGallery from "./ImageGallery/ImageGallery";
import ProductPrice from "./ProductPrice/ProductPrice";
import styled from "styled-components";
let StyledDiv = styled.div`
 width: 96% ;
  padding:  1%;
  border-radius: 10px;
  border: .1px solid rgba(0,0,0,.2);
  .saveBtn {
    display: flex;
    justify-content: center;
    .SaveVideoDataBtn {
      background-color: #0085ba;
      color: white;
      outline: none;
      border: none;
      padding: 5px 20px;
      font-size: large;
      border-radius: 5px;
    }
  }

  .VideoInformationSection ,.post-information-section {
    display: grid;
    grid-template-columns: 30% 1fr;
    align-items: center;

    .title {
      padding: 2px;
      font-size: small;
      @media only screen and (min-width: 768px) {
        font-size: medium;
      }
    }

    .editor {
      width: 100%;
      iframe {
        width: 100%;
        height: auto;
        @media only screen and (min-width: 768px) {
          width: 100%;
          min-height:400px;
        }
      }
      img{
        width: 240px;
        height: auto;
        @media only screen and (min-width: 768px) {
          width: 100%;
          min-height:400px;
        }
      }
      .option {
        display: flex;
        align-items: center;
      }

      select {
        border: none;
        background-color: #f1f1f1;
        padding: 4px;
        border-radius: 5px;
      }

      .textInput {
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
      
        height: 30px;
        background-color: #f1f1f1;
        width: 90%;
      }

      .textInputWithUpload {
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
  
        height: 30px;
        background-color: #f1f1f1;
        width: 80%;

      }

      .TextInput {
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
     
        height: 30px;
        background-color: #f1f1f1;
        width: 90%;

      }

      .uploadBtn {
        outline: none;
        border: none;
        padding: 3px 5px;
        width: 200px;
        height: 30px;
        margin: 0 3px;
        border-radius: 5px;
      }

      .textareaInput {
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
       
        height: 30px;
        background-color:#f1f1f1;
        width: 90%;
        min-height: 200px;
      }
    }
  }
`










const PostInformation = props => {
    return (
        <StyledDiv className='post-information  product-information admin-widget'>
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
        </StyledDiv>
    );
};
export default PostInformation;
