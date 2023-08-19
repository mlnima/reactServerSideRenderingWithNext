import React, {FC} from 'react';
import {Meta} from "typescript-types";
import MetasCardsRenderer from "@components/cards/CardsRenderer/MetasCardsRenderer/MetasCardsRenderer";
import Pagination from "@components/Pagination/Pagination";

interface MetasCardsRendererPropTypes {
    renderPagination:boolean,
    metas: Meta[],
    locale: string,
    totalCount: number,
    currentPage: number,
    numberOfCardsPerPage: number,
}

const CategoriesPageContentRenderer: FC<MetasCardsRendererPropTypes> = ({metas, locale,renderPagination,totalCount,currentPage,numberOfCardsPerPage}) => {



    return (
        <>
            <div className={'categoriesContainer'}>
                <MetasCardsRenderer metaType={'categories'} metas={metas} locale={locale}/>
            </div>
            {renderPagination && <Pagination totalCount={totalCount}
                                             currentPage={currentPage}
                                             numberOfCardsPerPage={numberOfCardsPerPage}/>}
        </>
    );
};
export default CategoriesPageContentRenderer;