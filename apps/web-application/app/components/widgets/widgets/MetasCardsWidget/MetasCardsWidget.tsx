import React, { FC } from 'react';
import { Meta } from "@repo/typescript-types";
import dynamic from 'next/dynamic';

const ActorsCardsRenderer = dynamic(
    () => import('@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer'),
);
const CategoriesCardsRenderer = dynamic(
    () => import('@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer'),
);

const MetasCardsWidget: ({
    uniqueData,
    metaType,
    locale,
    isSidebar,
}: {
    uniqueData: {
        metaData?: Meta[];
        metaType: string;
    };
    metaType: string;
    locale: string;
    isSidebar: boolean;
    dictionary: {
        [key: string]: string;
    };
}) => React.JSX.Element | null = ({ uniqueData, metaType, locale, isSidebar, dictionary }) => {
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
