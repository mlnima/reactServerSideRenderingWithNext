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
import {useSelector} from "react-redux";

let StyledDiv = styled.div`
  width: 96%;
  padding: 1%;
  border: .1px solid rgba(0, 0, 0, .2);
  background-color: white;

  .form-control-input {
    width: 95%;
  }


  .saveBtn {
    display: flex;
    justify-content: center;

    .SaveVideoDataBtn {
      background-color: #0085ba;
      color: white;
      outline: none;

      padding: 5px 20px;
      font-size: large;

    }
  }

  .VideoInformationSection, .post-information-section {
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
          min-height: 400px;
        }
      }

      img {
        width: 240px;
        height: auto;
        @media only screen and (min-width: 768px) {
          width: 100%;
          min-height: 400px;
        }
      }

      .option {
        display: flex;
        align-items: center;
      }

      select {
        padding: 4px;
      }

      .textInput {
        outline: none;
        padding: 3px 5px;
        height: 30px;
        width: 90%;
      }

      .textInputWithUpload {
        outline: none;
        padding: 3px 5px;
        height: 30px;
        width: 80%;

      }

      .TextInput {


      }

      .uploadBtn {
        outline: none;
        padding: 3px 5px;
        width: 200px;
        height: 30px;
        margin: 0 3px;
      }

      .textareaInput {
        outline: none;
        padding: 3px 5px;
        height: 30px;
        width: 90%;
        min-height: 200px;
      }
    }
  }
`

const PostInformation = props => {
    const post = useSelector((store) => store?.adminPanelPosts?.post);
    return (
        <StyledDiv className='post-information  product-information admin-widget'>
            <TextInputWithUploadBtn type='thumbnail' onChangeHandler={props.onChangeHandler} thumbnailsType={true} name='mainThumbnail'
                                    title='Main thumbnail' rendering={true}/>
            <ImagePreview/>
            <Quality rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInputWithUploadBtn type='video' {...props} name='videoUrl' title='Video Url' rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='videoEmbedCode' rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='source' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='redirectLink' rendering={post?.postType === 'promotion'} onChangeHandler={props.onChangeHandler}/>
            <TextAreaComponent name='videoScriptCode' rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <RenderIframe rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInputWithUploadBtn name='VideoTrailerUrl' title='Video Trailer Url' rendering={post.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='downloadLink' title='Download Link' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <Duration rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <ProductPrice rendering={post?.postType === 'product'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='shippingCost' rendering={post?.postType === 'product'} onChangeHandler={props.onChangeHandler}/>
            <ImageGallery rendering={post?.postType === 'product'} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='views' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='likes' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='disLikes' rendering={true} onChangeHandler={props.onChangeHandler}/>
        </StyledDiv>
    );
};
export default PostInformation;
