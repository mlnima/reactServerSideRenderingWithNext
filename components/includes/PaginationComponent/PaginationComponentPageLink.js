import Link from 'next/link'
import {useRouter} from "next/router";

const PaginationComponentPageLink = props => {

    const router = useRouter()

    return (
        <Link key={props.pageNumber.toString()} href={{pathname:router.pathname,query: {...router.query,page:props.pageNumber}}} scroll={false}>
            <a onClick={props.onActivateLoadingHandler}
               className='pagination-item'
               style={{
                   backgroundColor: props.isActivePage ? 'var(--main-active-color,#f90)': 'var(--navigation-background-color,#18181b)',
                   color: props.isActivePage ? 'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color,#ccc)'
               }}
            >
                {props.pageNumber}
            </a>
        </Link>
    );
};

export default PaginationComponentPageLink;


