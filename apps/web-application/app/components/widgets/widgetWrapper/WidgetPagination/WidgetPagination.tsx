import {FC} from "react";
import Link from 'next/link'
import {rangeNumGenerator} from "custom-util";
import './WidgetPagination.styles.scss'

interface WidgetPaginationPropTypes {
    baseUrl: string,
    totalCount: number,
    count: number
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({baseUrl, totalCount, count}) => {

    const numberOfCardsPerPage = 20
    const maxPage = totalCount ? Math.ceil(totalCount / numberOfCardsPerPage) : 0

    return (
        <div className={'widgetPagination'}>

            {[...rangeNumGenerator(1, maxPage), maxPage].map((pageNumber) => {
                if (pageNumber && typeof pageNumber === "number") {
                    const itemClassName =  pageNumber === 1  ? 'paginationItem paginationItemActive' : 'paginationItem'
                    return (
                        <div key={pageNumber}
                             className={itemClassName}>
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
