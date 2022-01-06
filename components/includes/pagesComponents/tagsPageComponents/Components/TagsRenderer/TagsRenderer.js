import React from 'react';
import TagCard from "../TagCard/TagCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";

let TagsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  .tag-card-image{
    .tag-card-link{
      width: 48vw;
      margin: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      background-color: var(--post-element-background-color,#131314);
      
      @media only screen and (min-width: 768px) {
        width: ${props=>props?.cardWidth}px;
        margin: 5px;

        .tag-card-title {
          font-size: 14px;
        }
      }
    }
  }
`

const TagsRenderer = ({metaData,postElementSize}) => {

    const tagsMetas = metaData?metaData: useSelector(store => store?.posts.tagsMetas)
    const elementSize = postElementSize ? postElementSize : useSelector(store => store?.settings?.design?.postElementSize);


    const dispatch = useDispatch()
    const cardWidth = elementSize === 'list' ? 116.6 :
        elementSize === 'smaller' ? 209.8 :
            elementSize === 'small' ? 255 :
                elementSize === 'medium' ? 320 : 255


    return (
        <TagsRendererStyledDiv className='tags-content' cardWidth={cardWidth}>
            {
                tagsMetas.map((tag,index) => {
                    return <TagCard onActivateLoadingHandler={()=> dispatch(setLoading(true))} key={index} cardWidth={cardWidth} tag={tag} postElementSize={elementSize}/>
                })
            }
        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
