import React, {FC} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {setLoading} from "@store/clientActions/globalStateActions";
import ActorCard from "@components/includes/cards/ActorCard";

interface ActorsContentStyledDivPropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
}

let ActorsRendererStyledDiv = styled.div`
  padding: 20px 0;
  display: grid;
  width: 98%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));

  @media only screen and (min-width: 768px) {
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  }
`

interface ActorsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],

    }
}

const ActorsRenderer: FC<ActorsRendererPropTypes> = ({uniqueData}) => {

    const dispatch = useDispatch();

    const {cardWidth, postsPerRawForMobile, actorsMetas} = useSelector(
        ({settings, posts}: StoreTypes) => {
            return {
                postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
                actorsMetas: uniqueData?.metaData || posts?.actorsMetas || [],
                cardWidth: 140,
            }
        })

    return (
        <ActorsRendererStyledDiv className='actors-content'
                                 cardWidth={cardWidth}
                                 postsPerRawForMobile={postsPerRawForMobile}>

            {actorsMetas.map((actor, index) => {

                    return <ActorCard key={actor._id}
                                      actor={actor}
                                      cardWidth={cardWidth}
                                      onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                      postsPerRawForMobile={postsPerRawForMobile}
                                      index={index}
                    />

                }
            )}

        </ActorsRendererStyledDiv>
    );
};

export default ActorsRenderer;
