import React, {FC} from 'react';
import {Meta} from "typescript-types";
import CategoriesCardsRenderer from "@components/cards/CardsRenderer/CategoriesCardsRenderer/CategoriesCardsRenderer";
import Pagination from "@components/Pagination/Pagination";

interface IProps {
    renderPagination:boolean,
    metas: Meta[],
    locale: string,
    totalCount: number,
    currentPage: number,
    numberOfCardsPerPage: number,
}

const CategoriesPageContentRenderer: FC<IProps> = ({metas, locale,renderPagination,totalCount,currentPage,numberOfCardsPerPage}) => {



    return (
        <>
            <div className={'categoriesContainer'}>
                <CategoriesCardsRenderer metas={metas} locale={locale}/>
            </div>
            {renderPagination && <Pagination totalCount={totalCount}
                                             currentPage={currentPage}
                                             numberOfCardsPerPage={numberOfCardsPerPage}/>}
        </>
    );
};
export default CategoriesPageContentRenderer;