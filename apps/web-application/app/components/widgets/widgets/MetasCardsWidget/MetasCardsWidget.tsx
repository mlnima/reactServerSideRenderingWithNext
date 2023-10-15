import React, {FC} from 'react';
import {Meta} from "typescript-types";
import dynamic from "next/dynamic";
const ActorsCardsRenderer = dynamic(() => import('@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer'))
const CategoriesCardsRenderer = dynamic(() => import('@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer'))

interface IProps {
    uniqueData: {
        metaData?: Meta[],
    },
    metaType:string,
    locale:string,
    isSidebar:boolean
}

const MetasCardsWidget: FC<IProps> = ({uniqueData,metaType,locale,isSidebar}) =>{

    if (metaType === 'actors'){
        return <ActorsCardsRenderer metas={uniqueData?.metaData} isSidebar={isSidebar} locale={locale}/>
    }else if (metaType === 'categories' ){
        return <CategoriesCardsRenderer locale={locale} metas={uniqueData?.metaData} metaType={'categories'} isSidebar={isSidebar}/>
    }
    //No Longer Rendering Tags Cards
    // else if ( metaType === 'tags'){
    //     return <CategoriesCardsRenderer locale={locale} metas={uniqueData?.metaData} metaType={'tags'} isSidebar={isSidebar}/>
    // }
    else return null
}

export default MetasCardsWidget