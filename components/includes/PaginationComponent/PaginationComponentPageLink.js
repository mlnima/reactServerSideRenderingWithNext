import Link from 'next/link'
import {useRouter} from "next/router";


const PaginationComponentPageLink = props => {

    const router = useRouter()

    const hrefPath = router.asPath.includes('?page') ?router.asPath.replace(`page=${router.query.page}`, `page=${props.pageNumber}`) :`${router.asPath}?page=${props.pageNumber}`

    return (
        <Link key={props.pageNumber.toString()} href={hrefPath} scroll={false}>
            <a className={props.currentPage === props.pageNumber ? 'active-page' : ''} >
                <style jsx>{`
                  a {
                    background-color: #282828;
                    color: var(--main-text-color);
                    padding: 5px 10px;
                    margin: 5px;
                    border-radius: 5px;
                  }
                  .active-page {
                    background-color: #2c5115;
                  }
                `}</style>
                {props.pageNumber}
            </a>
        </Link>
    );
};
export default PaginationComponentPageLink;



