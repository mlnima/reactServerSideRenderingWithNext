import React from 'react';
import ActorCard from "../../../../cards/ActorCard/ActorCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  .actor-card-image{
    .actor-card-link {
      width: 140px;
      margin: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      
      @media only screen and (min-width: 768px) {
        width: 140px;
        margin: 5px;
        .actor-card-title {
          font-size: 14px;
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
