import React, {FC} from 'react';
import dynamic from "next/dynamic";
import {Meta} from "typescript-types";
import '../staticCardsWrapper.styles.scss'
import {convertMetasTypeToSingular} from "custom-util";

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
                const imagesAllowedDomainsForNextImage = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []
                const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

                const isNextIImageAllowed = meta.imageUrl ?
                    imagesAllowedDomainsForNextImage?.some(domain => meta.imageUrl?.includes(domain)) :
                    false

                const metaUrl = locale === defaultLocale ?
                    `/${convertMetasTypeToSingular(meta?.type)}/${meta._id}` :
                    `/${locale}/${convertMetasTypeToSingular(meta?.type)}/${meta._id}`;

                return (
                    <MetaCardToRender key={meta._id}
                                      isNextIImageAllowed={isNextIImageAllowed}
                                      metaUrl={metaUrl}
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
