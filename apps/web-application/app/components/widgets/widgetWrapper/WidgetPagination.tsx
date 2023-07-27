'use client';
import {FC} from "react";
import Link from 'next/link'
import {rangeNumGenerator} from "custom-util";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

interface WidgetPaginationPropTypes {
    baseUrl: string,
    totalCount: number,
    count: number
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({baseUrl, totalCount, count}) => {

    const numberOfCardsPerPage = useSelector(({settings}: Store) => {
        return settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage || 20
    })

    const maxPage = totalCount ? Math.ceil(totalCount / numberOfCardsPerPage) : 0
    const pages = [...rangeNumGenerator(1, maxPage), maxPage]

    return (
        <div className={'widget-pagination flex justify-center my-2 flex-wrap gap-2 '}>
            {/*//@ts-ignore*/}
            {[...new Set(pages)].map((pageNumber, index) => {
                if (pageNumber && typeof pageNumber === "number") {
                    return (
                        <div key={index + pageNumber} className={`pagination-item text-primary-text-color
                         flex justify-center items-center
                         bg-primary-background-color w-10 h-10 rounded`}
                             style={{
                                 backgroundColor: pageNumber === 1 && numberOfCardsPerPage === (count || 20) ?
                                     'var(--primary-active-color,#f90)' :
                                     'var(--secondary-background-color, #181818)',
                                 color: pageNumber === 1 && numberOfCardsPerPage === (count || 20) ?
                                     'var(--secondary-background-color, #181818)' :
                                     'var(--primary-text-color, #fff)'
                             }}>
                            <Link
                                href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` : baseUrl + `?page=${pageNumber}`}`}>
                                {pageNumber}
                            </Link>
                        </div>
                    )
                } else return null

            })}
        </div>
    )
};
export default WidgetPagination
