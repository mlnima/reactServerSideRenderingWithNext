import React from 'react';
import ActorCard from "../ActorCard/ActorCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;


  .actor-card-image{
    .actor-card-link {
      width: 48vw;
      margin: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;



      @media only screen and (min-width: 768px) {
        width: ${props => props?.cardWidth}px;
        margin: 5px;

        .actor-card-title {
          font-size: 14px;
        }
      }
    }
  }




  .actor-card-info{
    .actor-card-link{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95%;
      margin: auto;
      color: var(--main-text-color);
      .actor-card-title {
        width: 100%;
        color: var(--main-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 12px;
        padding: 3px 0;
        margin: 3px 0;

        &:hover {
          filter: invert(70%);
        }
      }
    }
  }
  
  
  
  
  
  


`

const ActorsRenderer = ({metaData, postElementSize}) => {

    const actorsMetas = metaData ? metaData : useSelector(store => store?.posts.actorsMetas)
    const elementSize = postElementSize ? postElementSize : useSelector(store => store?.settings?.design?.postElementSize);

    const dispatch = useDispatch()

    const cardWidth = elementSize === 'list' ? 116.6 :
        elementSize === 'smaller' ? 209.8 :
            elementSize === 'small' ? 255 :
                elementSize === 'medium' ? 320 : 255

    return (
        <ActorsRendererStyledDiv className='actors-content' cardWidth={cardWidth}>
            {
                actorsMetas.map((actor, index) => {
                    return <ActorCard onActivateLoadingHandler={() => dispatch(setLoading(true))} key={index} cardWidth={cardWidth} actor={actor} postElementSize={elementSize}/>
                })
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
