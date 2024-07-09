import React, {FC} from 'react';
import {Meta} from "typescript-types";
import './CategoriesCardsRenderer.scss'
import {convertMetasTypeToSingular} from "@repo/shared-util";
import CategoryCard from "@components/cards/cardsComponents/CategoryCard/CategoryCard";

interface IProps {
    metas?: Meta[],
    locale:string,
    isSidebar?:boolean
}

const CategoriesCardsRenderer: FC<IProps> = ({metas,locale,isSidebar}) => {

    return (
        <div className={`categoriesCardsWrapper${isSidebar ? 'Sidebar' : ''} `}>
            {metas?.map((meta, index) => {

                const imagesAllowedDomainsForNextImage = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []
                const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

                const isNextImageAllowed = meta.imageUrl ?
                    imagesAllowedDomainsForNextImage?.some(domain => meta.imageUrl?.includes(domain)) :
                    false

                const metaUrl = locale === defaultLocale ?
                    `/${convertMetasTypeToSingular(meta?.type)}/${meta._id}` :
                    `/${locale}/${convertMetasTypeToSingular(meta?.type)}/${meta._id}`;

                return (
                    <CategoryCard key={meta._id}
                                      isNextImageAllowed={isNextImageAllowed}
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
export default CategoriesCardsRenderer;
