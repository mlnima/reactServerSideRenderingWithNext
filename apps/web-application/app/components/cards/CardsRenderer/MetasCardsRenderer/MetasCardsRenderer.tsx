import React, {FC} from 'react';
import dynamic from "next/dynamic";
import {Meta} from "typescript-types";
import '../staticCardsWrapper.styles.scss'

const CategoryCard = dynamic(() => import('@components/cards/cardsComponents/CategoryCard/CategoryCard'))
const TagCard = dynamic(() => import('@components/cards/cardsComponents/TagCard/TagCard'))

interface MetasCardsRendererPropTypes {
    metas?: Meta[],
    metaType: 'categories' | 'tags',
    locale:string,
    isSidebar?:boolean
}

const MetasCardsRenderer: FC<MetasCardsRendererPropTypes> = ({metas,metaType,locale,isSidebar}) => {

    const cardMatcher = {
        'categories': CategoryCard,
        'tags': TagCard
    }

    return (
        <div className={`staticCardsWrapper${isSidebar ? 'Sidebar' : ''} `}>
            {metas?.map((meta, index) => {
                const MetaCardToRender = cardMatcher?.[metaType]
                return (
                    <MetaCardToRender key={meta._id}
                                      meta={meta}
                                      isSidebar={isSidebar}
                                      locale={locale}
                                      index={index}/>
                )
            })}
        </div>
    );
};
export default MetasCardsRenderer;
