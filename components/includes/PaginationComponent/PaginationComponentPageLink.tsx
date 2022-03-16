import Link from 'next/link'
import {useRouter} from "next/router";
import {FC} from "react";

interface PaginationComponentPageLinkPropTypes{
    onActivateLoadingHandler:any,
    pageNumber:number,
    isActivePage:boolean
    
}
const PaginationComponentPageLink:FC<PaginationComponentPageLinkPropTypes> = 
    ({
         pageNumber,
         onActivateLoadingHandler,
         isActivePage
    }) => {

    const {pathname,query} = useRouter()

    return (
        <Link key={pageNumber.toString()} href={{pathname:pathname,query: {...query,page:pageNumber}}}>
            <a onClick={onActivateLoadingHandler}
               className='pagination-item'
               style={{
                   backgroundColor: isActivePage ? 'var(--main-active-color,#f90)': 'var(--navigation-background-color,#18181b)',
                   color: isActivePage ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
               }}
            >
                {pageNumber}
            </a>
        </Link>
    );
};

export default PaginationComponentPageLink;


