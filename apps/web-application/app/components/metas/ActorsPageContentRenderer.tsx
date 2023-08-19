import React, {FC} from 'react';
import {Meta} from "typescript-types";
import Pagination from "@components/Pagination/Pagination";
import ActorsCardsRenderer from "@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer";

interface MetasCardsRendererPropTypes {
    renderPagination: boolean,
    metas: Meta[],
    totalCount: number,
    currentPage: number,
    numberOfCardsPerPage: number
}

const ActorsPageContentRenderer: FC<MetasCardsRendererPropTypes> =
    ({
         metas,
         renderPagination,
         totalCount,
         currentPage,
         numberOfCardsPerPage
     }) => {
        return (
            <>
                <div className={'actorsContainer'}>
                    <ActorsCardsRenderer metas={metas}/>
                </div>
                {renderPagination && <Pagination totalCount={totalCount}
                                                 currentPage={currentPage}
                                                 numberOfCardsPerPage={numberOfCardsPerPage}/>}
            </>
        );
    };
export default ActorsPageContentRenderer;