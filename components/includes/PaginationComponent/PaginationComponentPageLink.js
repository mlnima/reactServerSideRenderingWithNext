import {useContext} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
const PaginationComponentPageLink = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const asQuery = {
        ...props.queries,
        page: props.pageNumber || 1,
    }

    return (
        <Link key={props.pageNumber.toString()}
              href={{
                  pathname: props.mainPath,
                  query: {...router.query,...props.queries, page: props.pageNumber}
              }}
              as={{
                  pathname: props.asPath,
                  query: asQuery
              }}
              scroll={false}
        >
            <a className={props.currentPage === props.pageNumber ? 'active-page' :''}  onClick={contextData.functions.loadingHandler}>
            <style jsx>{`
                a {
                    background-color: #282828;
                    color: var(--main-text-color);
                    padding: 5px 10px;
                    margin:  5px;
                    border-radius: 5px;
                }
                .active-page{
                    background-color: #2c5115;
                }
            `}</style>
            {props.pageNumber}
        </a>
        </Link>
    );
};
export default PaginationComponentPageLink;


