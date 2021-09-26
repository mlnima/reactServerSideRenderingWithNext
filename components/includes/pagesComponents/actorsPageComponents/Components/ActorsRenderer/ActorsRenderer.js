import React from 'react';
import ActorCard from "../ActorCard/ActorCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch} from "react-redux";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .actor-card-link{
    width: 48vw;
    margin: 1vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    .actor-card-title {
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
      width: ${props => props.cardWidth}px;
      margin: 5px;

      .actor-card-title {
        font-size: 14px;
      }
    }
  }
`

const ActorsRenderer = ({postElementSize, metaData, actors}) => {
    const dispatch = useDispatch()
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255

    return (
        <ActorsRendererStyledDiv className='actors-content' cardWidth={cardWidth}>
            {
                (actors || metaData || []).map((actor,index) => {
                    return <ActorCard onActivateLoadingHandler={()=> dispatch(setLoading(true))} key={index} cardWidth={cardWidth} actor={actor} postElementSize={postElementSize}/>
                })
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
