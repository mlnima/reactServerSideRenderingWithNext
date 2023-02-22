import Quality from "./Quality/Quality";
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
import {DashboardStore} from "typescript-types";
import {FC} from "react";
import {useAppDispatch} from "@store/hooks";
import {getPostScrapedDataAction} from "@store/reducers/postsReducer";

let StyledDiv = styled.div`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: var(--secondary-background-color, #181818);
  color: var(--secondary-text-color, #ccc);

  .form-control-input {
    box-sizing: border-box;
  }

  .VideoInformationSection, .post-information-section {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;

    .title {
      padding: 2px;
      font-size: small;
    }

    iframe {
      padding: 8px;
      box-sizing: border-box;
      width: 50%;
      aspect-ratio: 16/9;
    }

  }
`

interface PropTypes {
    onChangeHandler: Function
}

const PostInformation: FC<PropTypes> = (props) => {
    const post = useSelector(({posts}: DashboardStore) => posts.post);
    const dispatch = useAppDispatch()

    return (
        <StyledDiv className='post-information  product-information admin-widget'>

            <TextInput name='mainThumbnail' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <ImagePreview/>
            <Quality rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='videoUrl' rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='videoEmbedCode' rendering={post?.postType === 'video'}
                       onChangeHandler={props.onChangeHandler}/>
            <TextInput name='source' rendering={true} onChangeHandler={props.onChangeHandler}/>
            {!!post?.source && <div className={'scrapper-buttons'}>
                <button className={'btn btn-primary'} onClick={()=>dispatch(getPostScrapedDataAction({url:post?.source}))}>
                    scrap All
                </button>
                <button className={'btn btn-primary'}
                        onClick={()=>{
                            dispatch(getPostScrapedDataAction({
                                url:post?.source,fields:['mainThumbnail','videoEmbedCode','quality']
                            }))}
                        }>
                    scrap limited
                </button>
            </div>}


            <TextInput name='redirectLink' rendering={post?.postType === 'promotion'}
                       onChangeHandler={props.onChangeHandler}/>
            <TextInput name='redirectLink' rendering={!!post?.postType?.match(/^(promotion|out)$/)}
                       onChangeHandler={props.onChangeHandler}/>
            <TextAreaComponent name='videoScriptCode' rendering={post?.postType === 'video'}
                               onChangeHandler={props.onChangeHandler}/>
            <RenderIframe rendering={post?.postType === 'video'}/>
            <TextInput name='videoTrailerUrl' rendering={post?.postType === 'video'}
                       onChangeHandler={props.onChangeHandler}/>
            <TextInput name='downloadLink' rendering={true}
                       onChangeHandler={props.onChangeHandler}/>
            <Duration rendering={post?.postType === 'video'} onChangeHandler={props.onChangeHandler}/>
            <ProductPrice rendering={post?.postType === 'product'} onChangeHandler={props.onChangeHandler}/>
            <TextInput name='shippingCost' rendering={post?.postType === 'product'}
                       onChangeHandler={props.onChangeHandler}/>
            <ImageGallery rendering={post?.postType === 'product'} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='views' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='likes' rendering={true} onChangeHandler={props.onChangeHandler}/>
            <RatingAndViews name='disLikes' rendering={true} onChangeHandler={props.onChangeHandler}/>

        </StyledDiv>
    );
};

export default PostInformation;

