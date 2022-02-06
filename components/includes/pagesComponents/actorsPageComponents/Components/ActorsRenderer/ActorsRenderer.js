import React from 'react';
import ActorCard from "../../../../cards/desktop/ActorCard/ActorCard";
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
    const dispatch = useDispatch()

    const actorsRendererData = useSelector(store => {
        return{
            actorsMetas: metaData ? metaData : store?.posts.actorsMetas,
            elementSize: postElementSize ? postElementSize : store?.settings?.design?.postElementSize
        }
    })

    const cardWidth = actorsRendererData.elementSize === 'list' ? 116.6 :
        actorsRendererData.elementSize === 'smaller' ? 209.8 :
            actorsRendererData.elementSize === 'small' ? 255 :
                actorsRendererData.elementSize === 'medium' ? 320 : 255

    return (
        <ActorsRendererStyledDiv className='actors-content' cardWidth={cardWidth}>
            {
                actorsRendererData.actorsMetas.map((actor, index) => {
                    return <ActorCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                      key={index}
                                      cardWidth={cardWidth}
                                      actor={actor}
                                      postElementSize={actorsRendererData.elementSize}
                    />
                })
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
