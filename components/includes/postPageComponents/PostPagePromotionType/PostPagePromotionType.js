import React, {useEffect, useState, useContext, useRef} from 'react';
import styled from "styled-components";
import {AppContext} from "../../../../context/AppContext";
import PostDescription from "../../PostPage/components/PostDescription/PostDescription";
import RatingButtons from "../../PostPage/components/RatingButtons/RatingButtons";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";



//do not use this yet

let StyledMain = styled.main`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  #download-url {
    width: 100%;
    margin: 20px 0;
    .download-link {
      color: white;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 10px;
    }
  }
  .under-post-widget-area {
    width: 100%;
  }
${props => props.stylesData}
`
const PostPagePromotionType = ({design,post}) => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })
    useEffect(() => {
        likeDislikeView(post._id, 'views').then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, [post.likes, post.disLikes]);

    return (
        <StyledMain stylesData={design?.data?.postPageStyle || contextData.siteDesign.postPageStyle || ''} className='main post-page'>
            <PostDescription  description={post.description} translations={post.translations}/>
            <RatingButtons _id={post._id} svgDefaultStyle={state.svgDefaultStyle} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData}/>

        </StyledMain>
    );
};
export default PostPagePromotionType;
