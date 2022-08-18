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
        return {
            ...query,
            page: pageNumber
        }
    }, [query, pageNumber])

    return (
        <Link key={pageNumber.toString()} href={{pathname: pathname, query: nextQuery}}>
            <a className={`pagination-item ${isActivePage ? 'active-item' : ''}`}>
                {pageNumber}
            </a>
        </Link>
    );
};

export default PaginationComponentPageLink;