import Link from 'next/link'
import {useRouter} from "next/router";
import {FC, useMemo} from "react";

interface PropTypes {
    pageNumber: number,
    isActivePage: boolean
}

const PaginationComponentPageLink: FC<PropTypes> = ({pageNumber, isActivePage}) => {

    const {pathname, query} = useRouter()

    const nextQuery = useMemo(() => {
        const nextQuery = {
            ...query,
            page: pageNumber,
            content: query.content,
        }
        delete nextQuery?.content

        return nextQuery
    }, [query, pageNumber])

    return (
        <Link key={pageNumber.toString()}
              href={{pathname: pathname, query: nextQuery}}
              className={`pagination-item ${isActivePage ? 'active-item' : ''}`}>
                {pageNumber}
        </Link>
    );
};

export default PaginationComponentPageLink;