import React, {FC} from 'react';
import {Meta} from "@repo/typescript-types";
import Pagination from "@components/Pagination/Pagination";
import ActorsCardsRenderer from "@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer";

interface IProps {
    renderPagination: boolean,
    metas: Meta[],
    totalCount: number,
    currentPage: number,
    contentPerPage: number,
    locale: string
    dictionary: {
        [key: string]: string
    }
}

const ActorsPageContentRenderer: FC<IProps> =
    ({
         metas,
         renderPagination,
         totalCount,
         currentPage,
         locale,
         contentPerPage,
         dictionary
     }) => {
        return (
            <>
                <div className={'actorsContainer'}>
                    <ActorsCardsRenderer metas={metas} locale={locale} dictionary={dictionary}/>
                </div>
                {renderPagination && <Pagination totalCount={totalCount}
                                                 currentPage={currentPage}
                                                 contentPerPage={contentPerPage}/>}
            </>
        );
    };
export default ActorsPageContentRenderer;