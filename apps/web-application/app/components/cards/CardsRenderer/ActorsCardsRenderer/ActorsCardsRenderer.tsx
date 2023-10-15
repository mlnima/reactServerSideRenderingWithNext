import React, {FC} from 'react';
import ActorCard from '@components/cards/cardsComponents/ActorCard/ActorCard';
import { Meta} from "typescript-types";
import './ActorsCardsRenderer.styles.scss'
import {convertMetasTypeToSingular} from "custom-util";

interface IProps {
    metas?: Meta[],
    isSidebar?:boolean,
    locale:string
}

const ActorsCardsRenderer: FC<IProps> = ({metas,isSidebar,locale}) => {


    return (
        <div className={`actorsCardsWrapper ${isSidebar ? 'actorsCardsWrapperSidebar' : ''}`}>
            {metas?.map((meta, index) => {
                const imagesAllowedDomainsForNextImage = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []
                const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

                const isNextIImageAllowed = meta.imageUrl ?
                    imagesAllowedDomainsForNextImage?.some(domain => meta.imageUrl?.includes(domain)) :
                    false

                const actorUrl = locale === defaultLocale ?
                    `/${convertMetasTypeToSingular(meta?.type)}/${meta._id}` :
                    `/${locale}/${convertMetasTypeToSingular(meta?.type)}/${meta._id}`;

                return (
                    <ActorCard key={meta._id}
                               index={index}
                               actorUrl={actorUrl}
                               isNextIImageAllowed={isNextIImageAllowed}
                               isSidebar={isSidebar}
                               meta={meta}/>
                )
            })}
        </div>
    );
};
export default ActorsCardsRenderer;
