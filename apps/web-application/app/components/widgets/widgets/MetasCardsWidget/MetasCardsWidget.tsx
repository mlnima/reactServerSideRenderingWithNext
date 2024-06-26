import React, {FC} from 'react';
import {Meta} from "typescript-types";
import dynamic from "next/dynamic";
const ActorsCardsRenderer = dynamic(() => import('@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer'))
const CategoriesCardsRenderer = dynamic(() => import('@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer'))

interface IProps {
    uniqueData: {
        metaData?: Meta[],
        metaType:string,
    },
    metaType:string,
    locale:string,
    isSidebar:boolean
}

const MetasCardsWidget: FC<IProps> = ({uniqueData,metaType,locale,isSidebar}) =>{

    if (metaType === 'actors' || uniqueData?.metaType === 'actors'){
        return <ActorsCardsRenderer metas={uniqueData?.metaData} isSidebar={isSidebar} locale={locale}/>
    }else if (metaType === 'categories' || uniqueData?.metaType === 'categories' ){
        return <CategoriesCardsRenderer locale={locale} metas={uniqueData?.metaData}  isSidebar={isSidebar}/>
    }

    else return null
}

export default MetasCardsWidget