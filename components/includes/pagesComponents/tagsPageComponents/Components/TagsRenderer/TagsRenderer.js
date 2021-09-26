import React from 'react';
import TagCard from "../TagCard/TagCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch} from "react-redux";

let TagsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  .tag-card-link{
    width: 48vw;
    margin: 1vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: var(--post-element-background-color,#131314);
    .tag-card-title {
      width: 100%;
      color: var(--main-text-color);
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-weight: initial;
      font-size: 12px;
      padding: 5px 0;
      &:hover {
        filter: invert(70%);
      }
    }

    @media only screen and (min-width: 768px) {
      width: ${props=>props.cardWidth}px;
      margin: 5px;

      .tag-card-title {
        font-size: 14px;
      }
    }
  }
`

const TagsRenderer = ({postElementSize,metaData, tags}) => {

    const dispatch = useDispatch()
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255


    return (
        <TagsRendererStyledDiv className='tags-content' cardWidth={cardWidth}>
            {
                (tags || metaData || []).map((tag,index) => {
                    return <TagCard onActivateLoadingHandler={()=> dispatch(setLoading(true))} key={index} cardWidth={cardWidth} tag={tag} postElementSize={postElementSize}/>
                })
            }
        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
