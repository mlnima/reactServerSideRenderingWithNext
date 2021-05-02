import {useEffect, useState} from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import {likeValueCalculator} from "../../../../_variables/_variables";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import withRouter from 'next/dist/client/with-router'
import EditLinkForAdmin from "./EditLinkForAdmin/EditLinkForAdmin";
import RatingButtons from "./RatingButtons/RatingButtons";
import Price from "./Price/Price";
import PostTitle from "./PostTitle/PostTitle";
import PostDescription from "./PostDescription/PostDescription";
import AddToBasket from "./AddToBasket/AddToBasket";
import styled from "styled-components";
let StyledDiv = styled.div`
  width: 100%;
`

let StyledPostInfoHead = styled.div`
    background-color: var(--post-page-info-background-color);
    padding: 5px;
    .under-title{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .rate-logo{
        width: 30px ;
        height: 35px;
        transition: .5s;
        &:hover{
          width: 35px ;
          height: 40px;
        }
      }
      .price-information{
        margin: 0 20px;
        display: flex;
        align-items: center;
        font-size: 25px;
        font-weight: bold;
        .price-info-logo{
          width: 23px;
          height: 23px;
        }
      }
    }
`
const PostInfo = ({title,likes,disLikes,downloadLink,postType,price,actors,tags,categories,description,_id,translations,currency,rating}) => {
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked: false,
        isDisliked: false,
        svgDefaultStyle: {
            maxWidth: '25px',
            maxHeight: '25px'
        }
    });

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setState({
                ...state,
                likeValue: likeValueCalculator(likes, disLikes),
                postAbsolutePath: window.location.href
            });
        }
        likeDislikeView(_id, 'views').then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, [likes, disLikes]);


    return (
        <StyledDiv className='post-info'>
<style jsx>{`
.post-info {
width: 100%;
}
.post-info-head {
background-color: var(--post-page-info-background-color);
padding: 5px;
}
.under-title{
display: flex;
justify-content: space-between;
flex-wrap: wrap;
}
.rate-logo{
width: 30px;
height: 35px;
transition: .5s;
}
.rate-logo:hover {
width: 35px;
height: 40px;
}

@media only screen and (min-width: 768px) {
      .like {
        justify-content: start;
      }
}


`}</style>
            <EditLinkForAdmin _id={_id}/>
            <StyledPostInfoHead className='post-info-head'>
                <PostTitle title={title} translations={translations}/>
                <div className='under-title'>
                    <RatingButtons _id={_id} svgDefaultStyle={state.svgDefaultStyle} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData}/>
                    {
                        postType === 'product'?
                            <Price price={price} currency={currency}  svgDefaultStyle={state.svgDefaultStyle}/>:
                            null
                    }

                    <DownloadLink downloadLink={downloadLink} render={downloadLink} svgDefaultStyle={state.svgDefaultStyle}/>
                </div>
                <AddToBasket productId={_id} render={postType === 'product'} svgDefaultStyle={state.svgDefaultStyle}/>
            </StyledPostInfoHead>

            <div className='post-info-body'>
                <div className="meta-description">
                    <PostDescription  description={description} translations={translations}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='actors' data={actors || []}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='tags' data={tags || []}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='categories' data={categories || []}/>
                </div>
            </div>
        </StyledDiv>
    );
};
export default withRouter(PostInfo);
