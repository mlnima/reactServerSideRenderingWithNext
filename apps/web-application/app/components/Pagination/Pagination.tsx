'use client';
import {FC} from "react";
import {useParams, usePathname, useSearchParams} from "next/navigation";
import {rangeNumGenerator} from "custom-util";
import Link from 'next/link'
import './Pagination.styles.scss'

interface IProps{
    totalCount:number,
    numberOfCardsPerPage?:number,
    currentPage?:number,
}

const Pagination: FC<IProps> = ({totalCount,numberOfCardsPerPage=20,currentPage=1}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const maxPage = Math.ceil(totalCount / numberOfCardsPerPage)

    if (totalCount > numberOfCardsPerPage) {
        const range = rangeNumGenerator(currentPage, maxPage)
                       .filter(n => (n !== (1 || maxPage)) && (n < maxPage) && (n > 0))
        const rangeWithMinMax = [1, ...range, maxPage]

        return (
            <div className='pagination'>
                {rangeWithMinMax.map((pageNumber, index) => {
                    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
                    newSearchParams.set('page',pageNumber.toString())
                    const targetURl = `${pathname}?${newSearchParams}`

                    return (
                        <Link key={pageNumber.toString() + index}
                              href={targetURl}
                              className={`pagination-item ${pageNumber === currentPage ? 'active-item' : ''}`}>
                              {pageNumber}
                        </Link>
                    )
                })}
            </div>
        );
    } else return null
};

export default Pagination;
