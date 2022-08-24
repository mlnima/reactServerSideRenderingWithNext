import React, {FC, useMemo} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";

const TagCard = dynamic(() => import('@components/includes/cards/TagCard'))
const ActorCard = dynamic(() => import('@components/includes/cards/ActorCard'))
const CategoryCard = dynamic(() => import('@components/includes/cards/CategoryCard'))


interface MetasCardsRendererStylePropType {
    postsPerRawForMobile: number,
    cardWidth: number,
    metaType: string,
    cardsCustomStyle: string
}

interface MetasCardsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    metaType: string,
    cardWidthDesktop?: number,
}

let MetasCardsRendererStyle = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile,metaType,cardWidth}: MetasCardsRendererStylePropType) => {
      return metaType === 'actors' ? `${cardWidth}px` : `${96 / postsPerRawForMobile}`
  }}vw, 2fr));


  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: MetasCardsRendererStylePropType) => {
        return `${cardWidth}px`
    }}, 1fr));
  }
  ${({cardsCustomStyle}: MetasCardsRendererStylePropType) => cardsCustomStyle || ''}
`

const MetasCardsRenderer: FC<MetasCardsRendererPropTypes> = ({uniqueData, metaType}) => {

    const {metas, postsPerRawForMobile, cardWidth, cardsCustomStyle} = useSelector(
        ({settings, posts}: StoreTypes) => {
            return {
                metas: uniqueData?.metaData || (metaType === 'categories' ? posts?.categoriesMetas :
                    metaType === 'tags' ? posts?.tagsMetas : metaType === 'actors' ? posts?.actorsMetas : []) ,
                    postsPerRawForMobile : settings?.design?.postsPerRawForMobile || 2,
                cardsCustomStyle: settings?.design?.cardsCustomStyle || '',
                cardWidth: settings?.design?.cardWidthDesktop || (metaType === 'actors' ? 140 :255),
            }
        })

    const MetaCardToRender = useMemo(() => {
        return metaType === 'categories' ? CategoryCard :
            metaType === 'tags' ? TagCard : ActorCard
    }, [])

    return (
        <MetasCardsRendererStyle className='metas-block'
                                 cardWidth={cardWidth}
                                 metaType={metaType}
                                 cardsCustomStyle={cardsCustomStyle}
                                 postsPerRawForMobile={postsPerRawForMobile}>

            {metas?.map((meta, index) => {
                return (
                    <MetaCardToRender key={meta._id}
                                      meta={meta}
                                      cardWidth={cardWidth}
                                      postsPerRawForMobile={postsPerRawForMobile}
                                      index={index}/>
                )
            })}

        </MetasCardsRendererStyle>
    );
};
export default MetasCardsRenderer;
