"use client";
import React, {FC} from 'react';
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {Store, Meta} from "typescript-types";

const CategoryCard = dynamic(() => import('../metasCards/CategoryCard'))
const TagCard = dynamic(() => import('../metasCards/TagCard'))
const ActorCard = dynamic(() => import('../metasCards/ActorCard'))


interface MetasCardsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    metaType: string,
    cardWidthDesktop?: number,
    locale:string
}

const MetasCardsRenderer: FC<MetasCardsRendererPropTypes> = ({uniqueData, metaType,locale}) => {

    const {numberOfCardsPerRowInMobile, customStyles, cardWidth} = useSelector(({settings}: Store) => {

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

    const metas = useSelector(({posts}: Store) =>
        uniqueData?.metaData || (metaType === 'categories' ? posts?.categoriesMetas :
            metaType === 'tags' ? posts?.tagsMetas : metaType === 'actors' ? posts?.actorsMetas : []))




    return (
        <div className={`metas-content flex flex-wrap gap-4 justify-center items-center`}>

            {metas?.map((meta, index) => {

                const metaProps = {
                    meta:meta,
                    locale,
                    cardWidth:cardWidth,
                    title: meta?.translations?.[locale as string]?.name ?? meta?.name,
                    index:index,
                    numberOfCardsPerRowInMobile:numberOfCardsPerRowInMobile
                }
                //@ts-ignore
                if(cardMatcher?.[metaType]){
                    //@ts-ignore
                    const MetaCardToRender = cardMatcher?.[metaType]
                    return (
                        <MetaCardToRender key={meta._id} {...metaProps}/>
                    )
                }else return null


            })}

        </div>
    );
};
export default MetasCardsRenderer;
