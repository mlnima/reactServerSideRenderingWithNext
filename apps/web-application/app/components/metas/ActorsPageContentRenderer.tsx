import React, {FC} from 'react';
import {Meta} from "typescript-types";
import Pagination from "@components/Pagination/Pagination";
import ActorsCardsRenderer from "@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer";

interface IProps {
    renderPagination: boolean,
    metas: Meta[],
    totalCount: number,
    currentPage: number,
    numberOfCardsPerPage: number,
    locale: string
}

const ActorsPageContentRenderer: FC<IProps> =
    ({
         metas,
         renderPagination,
         totalCount,
         currentPage,
         locale,
         numberOfCardsPerPage
     }) => {
        return (
            <>
                <div className={'actorsContainer'}>
                    <ActorsCardsRenderer metas={metas} locale={locale}/>
                </div>
                {renderPagination && <Pagination totalCount={totalCount}
                                                 currentPage={currentPage}
                                                 numberOfCardsPerPage={numberOfCardsPerPage}/>}
            </>
        );
    };
export default ActorsPageContentRenderer;