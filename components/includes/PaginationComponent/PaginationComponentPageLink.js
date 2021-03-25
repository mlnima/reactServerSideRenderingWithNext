import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
const PaginationComponentPageLink = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    // const contentType = router.asPath.includes('tags') ? 'tags':
    //                     router.asPath.includes('categories') ? 'categories':
    //                     router.asPath.includes('actors') ? 'actors': 'tags'
    //
    // //const mainPath = router.asPath.includes('content') ? '/posts' : '/meta'
    // const mainPath =  router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/posts' : '/meta'
    //
    //
    // const asPath =   router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/' + props.contentType + '/' + router.query.contentName :
    //                  router.asPath.includes('/tags') ? '/tags' :
    //                  router.asPath.includes('/categories') ? '/categories' :
    //                  router.asPath.includes('/actors') ? '/actors' :
    //                  router.pathname;
    //
    // const content = router.query.content ? {content:router.query.content} :{}
    //
    //
    // const asQuery = {
    //     ...props.content,
    //     page: props.pageNumber || 1,
    // }
    const asQuery = {
        ...props.content,
        page: props.pageNumber || 1,
    }

console.log(props.mainPath)
    console.log(props.asPath)

    return (
        <Link key={props.pageNumber.toString()}
              href={{
                  pathname: props.mainPath,
                  query: {...router.query, page: props.pageNumber}
              }}
              as={{
                  pathname: props.asPath,
                  query: asQuery
              }}>
            <a className={props.currentPage === props.pageNumber ? 'active-page' :''} onClick={()=>contextData.dispatchState({...contextData.state,loading:true})}>
            {props.pageNumber}
        </a>
        </Link>
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
