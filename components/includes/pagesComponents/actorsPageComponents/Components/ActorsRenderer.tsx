import React, {FC, useMemo} from 'react';

import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {setLoading} from "@store/clientActions/globalStateActions";
import dynamic from "next/dynamic";
//import cardSizeCalculator from "@_variables/util/cardSizeCalculator";
const ActorCard = dynamic(() => import('../../../cards/desktop/ActorCard/ActorCard'));
const MobileActorCard = dynamic(() => import('../../../cards/mobile/MobileActorCard/MobileActorCard'));


interface ActorsContentStyledDivPropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
}

let ActorsRendererStyledDiv = styled.div`

  display: grid;
  width: 98%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
    // grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile}: ActorsContentStyledDivPropTypes) => `${96 / postsPerRawForMobile}`}vw, 2fr));

  // @media only screen and (min-width: 414px) {
  //   grid-gap: 15px 10px;
    //   grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: ActorsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  // }


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

    const {cardWidth, postsPerRawForMobile, actorsMetas, isAppleMobile, isMobileDevice} = useSelector(
        ({settings, posts}: StoreTypes) => {
            return {
                postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
                isMobileDevice: settings?.isMobile,
                actorsMetas: uniqueData?.metaData || posts?.actorsMetas || [],
                cardWidth: 140,
                isAppleMobile: settings?.isAppleMobileDevice
            }
        })

    const isMobile = useMemo(() => isMobileDevice, [])
    const isAppleMobileDevice = useMemo(() => isAppleMobile, [])


    return (
        <ActorsRendererStyledDiv className='actors-content'
                                 cardWidth={cardWidth}
                                 postsPerRawForMobile={postsPerRawForMobile}>

            {actorsMetas.map((actor, index) => {

                    if (isMobile) {
                        return <MobileActorCard key={actor._id}
                                                actor={actor}
                                                onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                isAppleMobileDevice={isAppleMobileDevice}
                                                index={index}/>
                    } else {
                        return <ActorCard key={actor._id}
                                          actor={actor}
                                          onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                          isAppleMobileDevice={isAppleMobileDevice}
                                          index={index}
                        />
                    }

                }
            )}
        </ActorsRendererStyledDiv>
    );
};

export default ActorsRenderer;
