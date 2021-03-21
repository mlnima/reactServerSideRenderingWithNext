import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";

const PaginationComponentPageLink = props => {
    const router = useRouter()

    const contentType = router.asPath.includes('tags') ? 'tags':
                        router.asPath.includes('categories') ? 'categories':
                        router.asPath.includes('actors') ? 'actors': 'tags'

    //const mainPath = router.asPath.includes('content') ? '/posts' : '/meta'
    const mainPath =  router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/posts' : '/meta'
console.log(mainPath)

    const asPath =   router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/' + contentType + '/' + router.query.contentName :
                     router.asPath.includes('/tags') ? '/tags' :
                     router.asPath.includes('/categories') ? '/categories' :
                     router.asPath.includes('/actors') ? '/actors' :
                     router.pathname;

    const content = router.query.content ? {content:router.query.content} :{}


    const asQuery = {
        ...content,
        page: props.pageNumber || 1,
    }

    return (
        <Link key={props.pageNumber.toString()}
              href={{
                  pathname: mainPath,
                  query: {...router.query, page: props.pageNumber}
              }}
              as={{
                  pathname: asPath,
                  query: asQuery
              }}

        ><a className={props.currentPage === props.pageNumber ? 'active-page' :''}>{props.pageNumber}</a></Link>
    );
};
export default PaginationComponentPageLink;


//className={classNameForActivePage}


// const [queries, setQueries] = useState({})
// const classNameForActivePage = props.page === props.currentPage ? 'active-page' : ''
//  const asPathData = router.asPath.includes('page')?  router.asPath.replace(/(page=).*?(&)/,props.page):router.asPath + `&page=${props.page}`
//  const pathData = router.asPath.includes('page')?  router.asPath.replace(/(page=).*?(&)/,props.page):router.asPath + `&page=${props.page}`
//  console.log(router.pathname)
// useEffect(() => {
//     setQueries({
//         ...queries,
//         ...router.query
//     })
//     // console.log(props)
// }, [props]);
// const mainPath = router.asPath.includes(('/tags/'||'/categories/'||'/actors/')) ? '/posts' :
//                  router.asPath.includes(('/tags'||'/categories'||'/actors')) ? '/meta' : '/meta';
