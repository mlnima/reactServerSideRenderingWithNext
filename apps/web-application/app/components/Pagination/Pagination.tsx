'use client';
import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { rangeNumGenerator } from '@repo/shared-util';
import Link from 'next/link';
import './Pagination.styles.scss';
import ServerSideStore from '@store/ServerSideStore';

interface IProps {
    totalCount: number;
    currentPage?: number;
}

const Pagination: FC<IProps> = ({ totalCount, currentPage = 1 }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const contentPerPage = ServerSideStore.getContentPerPage();
    const maxPage = Math.ceil(totalCount / contentPerPage);

    if (totalCount > contentPerPage) {
        const range = rangeNumGenerator(currentPage, maxPage).filter(
            (n: number) => n !== (1 || maxPage) && n < maxPage && n > 0,
        );
        const rangeWithMinMax = [1, ...range, maxPage];

        return (
            <div className="pagination">
                {rangeWithMinMax.map((pageNumber, index) => {
                    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
                    newSearchParams.set('page', pageNumber.toString());
                    const targetURl = `${pathname}?${newSearchParams}`;

                    return (
                        <Link
                            key={pageNumber.toString() + index}
                            href={targetURl}
                            rel={pageNumber > currentPage ? 'next' : 'prev'}
                            className={`pagination-item ${pageNumber === currentPage ? 'active-item' : ''}`}
                        >
                            {pageNumber}
                        </Link>
                    );
                })}
            </div>
        );
    } else return null;
};

export default Pagination;
