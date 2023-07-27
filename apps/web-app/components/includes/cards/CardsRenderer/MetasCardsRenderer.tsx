import React, {FC} from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";
import {Meta} from "typescript-types";
import {useAppSelector} from "@store_toolkit/hooks";

const TagCard = dynamic(() => import('../metasCards/TagCard'))
const ActorCard = dynamic(() => import('../metasCards/ActorCard'))
const CategoryCard = dynamic(() => import('../metasCards/CategoryCard'))

interface MetasCardsRendererStylePropType {
    numberOfCardsPerRowInMobile?: number,
    cardWidth?: number,
    metaType: string,
    customStyles?: string
}

interface MetasCardsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    metaType: string,
    cardWidthDesktop?: number,
}

interface IStyle{
    numberOfCardsPerRowInMobile:number,
    cardWidth:number,
    metaType:string,
    customStyles?:string
}



let MetasCardsRendererStyle = styled.div<IStyle>`
  padding: 5px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({numberOfCardsPerRowInMobile, metaType, cardWidth}) => {
            return metaType === 'actors' ? `${cardWidth}px` : `${96 / (numberOfCardsPerRowInMobile || 2)}vw`
          }}, 2fr));
  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}) => `${cardWidth}px`}, 1fr));
  }
  ${({customStyles}) => customStyles || ''}
`

const MetasCardsRenderer: FC<MetasCardsRendererPropTypes> = ({uniqueData, metaType}) => {

    const {numberOfCardsPerRowInMobile, customStyles, cardWidth} = useAppSelector(({settings}) => {

        return {
            numberOfCardsPerRowInMobile: settings?.initialSettings?.postCardsSettings?.numberOfCardsPerRowInMobile || 2,
            customStyles: settings?.initialSettings?.postCardsSettings?.customStyles,
            cardWidth: metaType === 'actors' ? 140 : settings?.initialSettings?.postCardsSettings?.cardsWidthDesktop || 255,
        }
    })

    const cardMatcher = {
        'categories': CategoryCard,
        'tags': TagCard,
        'actors': ActorCard
    }

    const metas = useAppSelector(({posts}) =>
        uniqueData?.metaData || (metaType === 'categories' ? posts?.categoriesMetas :
            metaType === 'tags' ? posts?.tagsMetas : metaType === 'actors' ? posts?.actorsMetas : []))


    const MetaCardToRender = cardMatcher[metaType] || null

    return (
        <MetasCardsRendererStyle className='metas-block'
                                 cardWidth={cardWidth}
                                 metaType={metaType}
                                 customStyles={customStyles}
                                 numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}>

            {metas?.map((meta, index) => {
                return (
                    <MetaCardToRender key={meta._id}
                                      meta={meta}
                                      cardWidth={cardWidth}
                                      numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                      index={index}/>
                )
            })}

        </MetasCardsRendererStyle>
    );
};
export default MetasCardsRenderer;


//@ts-ignore
// const {role} = useSelector(({user}: Store) => user.userData)
//
// const adminMode = useSelector(({globalState}: Store) => globalState.adminMode)

// const MetaCardToRender = useMemo(() => {
//     return metaType === 'categories' ? CategoryCard :
//         metaType === 'tags' ? TagCard : ActorCard
// }, [])