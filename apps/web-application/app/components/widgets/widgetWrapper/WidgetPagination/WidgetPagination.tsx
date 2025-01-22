import { FC } from 'react';
import Link from 'next/link';
import { rangeNumGenerator } from '@repo/utils';
import './WidgetPagination.scss';

interface WidgetPaginationPropTypes {
    baseUrl: string;
    totalCount: number;
    count: number;
    sortBy: string;
}

const WidgetPagination: FC<WidgetPaginationPropTypes> = ({
                                                             baseUrl,
                                                             totalCount,
                                                             // count,
                                                             sortBy }) => {
    const contentPerPage = 20;
    const maxPage = totalCount ? Math.ceil(totalCount / contentPerPage) : 0;

    return (
        <div className={'widgetPagination'}>
            {[...rangeNumGenerator(1, maxPage), maxPage].map(pageNumber => {
                if (pageNumber && typeof pageNumber === 'number') {
                    const itemClassName =
                        pageNumber === 1 && sortBy !== 'random'
                            ? 'paginationItem paginationItemActive'
                            : 'paginationItem';

                    const isBaseUrlWithQuery = baseUrl.includes('?');
                    const sortQuery = sortBy !== 'random' ? sortBy : null;
                    const targetUrlWithPageQuery = isBaseUrlWithQuery
                        ? baseUrl + `&page=${pageNumber}`
                        : baseUrl + `?page=${pageNumber}`;
                    const targetUrl = sortQuery ? targetUrlWithPageQuery + `&sort=${sortBy}` : targetUrlWithPageQuery;
                    // console.log('targetUrl=> ',targetUrl)
                    return (
                        <div key={pageNumber} className={itemClassName}>
                            <Link href={targetUrl}>{pageNumber}</Link>
                        </div>
                    );
                } else return null;
            })}
        </div>
    );
};
export default WidgetPagination;
//href={`${baseUrl.includes('?') ? baseUrl + `&page=${pageNumber}` : baseUrl + `?page=${pageNumber}`}`}