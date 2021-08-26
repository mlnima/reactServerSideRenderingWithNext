import Link from 'next/link'
import {useRouter} from "next/router";


const PaginationComponentPageLink = props => {

    const router = useRouter()

//     //const hrefPath = router.asPath.includes('?page') ? router.asPath.replace(`page=${router.query.page}`, `page=${props.pageNumber}`) : `${router.asPath}?page=${props.pageNumber}`
//     const hrefPath = router.pathname.includes('?page') ? router.pathname.replace(`page=${router.query.page}`, `page=${props.pageNumber}`) : `${router.pathname}?page=${props.pageNumber}`
//
// console.log(router)
    return (
        <Link key={props.pageNumber.toString()} href={{pathname:router.pathname,query: {...router.query,page:props.pageNumber}}} scroll={false}>
            <a onClick={props.onActivateLoadingHandler}>
                <style jsx>{`
                  a {
                    background-color: ${(parseInt(router.query?.page) === props.pageNumber) || (!router.query?.page && props.pageNumber ===1) ? 'var(--main-active-color)' : '#282828'};
                    color: var(--main-text-color);
                    padding: 5px 10px;
                    margin: 5px;
                    border-radius: 5px;

                    &:hover {
                      filter: invert(1);
                    }
                  }

                `}</style>
                {props.pageNumber}
            </a>
        </Link>
    );
};
export default PaginationComponentPageLink;



