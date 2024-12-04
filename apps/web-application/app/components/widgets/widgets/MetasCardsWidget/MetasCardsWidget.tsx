import {Meta, MetasType} from "@repo/typescript-types";
import dynamic from 'next/dynamic';
import React from "react";

const ActorsCardsRenderer = dynamic(
    () => import('@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer'),
);

const CategoriesCardsRenderer = dynamic(
    () => import('@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer'),
);

interface IProps{
    uniqueData: {
        metaData?: Meta[];
        metaType: MetasType;
    };
    metaType: MetasType;
    locale: string;
    isSidebar: boolean;
    dictionary: {
        [key: string]: string;
    };
}

const MetasCardsWidget : React.FC<IProps>= ({ uniqueData, metaType, locale, isSidebar, dictionary }) => {
    if (metaType === 'actors' || uniqueData?.metaType === 'actors') {
        return (
            <ActorsCardsRenderer
                metas={uniqueData?.metaData}
                isSidebar={isSidebar}
                locale={locale}
                dictionary={dictionary}
            />
        );
    } else if (metaType === 'categories' || uniqueData?.metaType === 'categories') {
        return (
            <CategoriesCardsRenderer
                locale={locale}
                metas={uniqueData?.metaData}
                isSidebar={isSidebar}
                dictionary={dictionary}
            />
        );
    } else return null;
};

export default MetasCardsWidget;
