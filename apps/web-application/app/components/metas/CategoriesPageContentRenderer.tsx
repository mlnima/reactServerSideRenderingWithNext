import React, { FC } from 'react';
import { Meta } from "@repo/typescript-types";
import CategoriesCardsRenderer from '@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer';
import Pagination from '@components/Pagination/Pagination';

interface IProps {
    renderPagination: boolean;
    metas: Meta[];
    locale: string;
    totalCount: number;
    currentPage: number;
    dictionary: {
        [key: string]: string;
    };
}

const CategoriesPageContentRenderer: FC<IProps> = ({
    metas,
    locale,
    renderPagination,
    totalCount,
    currentPage,
    dictionary,
}) => {
    return (
        <>
            {metas?.length > 0 && (
                <div className={'categoriesContainer'}>
                    <CategoriesCardsRenderer metas={metas} locale={locale} dictionary={dictionary} />
                </div>
            )}

            {renderPagination && (
                <Pagination
                    totalCount={totalCount}
                    currentPage={currentPage}
                />
            )}
        </>
    );
};
export default CategoriesPageContentRenderer;
