import Link from 'next/link'
import {useRouter} from "next/router";
import {FC} from "react";

interface PropTypes {
    pageNumber: number,
    isActivePage: boolean
}

const PaginationComponentPageLink: FC<PropTypes> = ({pageNumber, isActivePage}) => {

    const {pathname, query} = useRouter()

    return (
        <Link key={pageNumber.toString()} href={{pathname: pathname, query: {...query, page: pageNumber}}}>
            <a className={`pagination-item ${isActivePage ? 'active-item' : ''}`}>
                {pageNumber}
            </a>
        </Link>
    );
};

export default PaginationComponentPageLink;