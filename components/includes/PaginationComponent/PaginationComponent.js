import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router';
import _ from 'lodash'
import {useRouter} from "next/router";
import {pathAndAsPathGenerator} from "../../../_variables/_variables";

const PaginationComponent = props => {
    const router = useRouter()

    const [range, setRange] = useState([])

    const [queries, setQueries] = useState({})

    // useEffect(() => {
    //     console.log('queries:', queries)
    //     console.log('state:', range)
    // }, [queries,range]);


    useEffect(() => {
        if (props.router) {
            setQueries({
                ...queries,
                ...props.router.query
            })
            setRange([1, ...rangeNumGenerator(props.currentPage,props.maxPage), props.maxPage])
        }
    }, [props]);



const rangeNumGenerator = (currentPageInput,max) =>{
    let currentPage = currentPageInput, // input
        range       =6,  // amount of links displayed
        maxPage  = max -1,
        start       = 2;  // default


    let paging = [];      // output variable

    // Don't use negative values, force start at 1
    if (currentPage < (range / 2) + 1 ) {
        // console.log(1)
        start = 1;
        // Don't go beyond the last page
    } else if (currentPage >= (maxPage - (range / 2) )) {
        // console.log(2)
        start = Math.floor(maxPage - range + 1);

    } else {
        // console.log(3)
        start = (currentPage - Math.floor(range / 2));
    }

    for (let i = start; i <= ((start + range) - 1); i++) {
        if (i === currentPage) {
            paging.push(i); // add brackets to indicate current page
        } else {
            paging.push(i);
        }
    }
    return paging;
}


    const renderPaginationItems = [...new Set(range)].map(page => {

        const mainPath = props.router ?
            props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' :
                props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? '/meta' : '/posts' : '/posts';


        const asPath = !props.router ? '/posts' :
            props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/' + queries.contentType + '/' + queries.contentName :
                props.router.asPath.includes('/tags') ? '/tags' :
                    props.router.asPath.includes('/categories') ? '/categories' :
                        props.router.asPath.includes('/actors') ? '/actors' :
                            props.router.pathname;

        const mainQuery = !props.router ? {} :
            props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? {
                page: queries.page,
                content: queries.content
            } : {...props.queryData}


        // const asQuery = {
        //     content: queries.content ,
        //     page: page == 1 ? null : page,
        // }

        const asQuery = {
            keyword: queries.keyword ? queries.keyword : undefined,
            // page: props.router.query.page ? props.router.query.page : undefined,
            page,
            content: props.router.query.content ? props.router.query.content : undefined,
        }
        !asQuery.keyword ? delete asQuery.keyword : null;
        // asQuery.page ==1 ? delete asQuery.page  : null;
        !asQuery.page ? delete asQuery.page : null;
        !asQuery.content ? delete asQuery.content : null;

        if (props.router) {
            page == 1 ? delete asQuery.page : null
            !asQuery.content ? delete asQuery.content : null
            const classNameForActivePage = page === props.currentPage ? 'active-page' : ''

            const pathData = pathAndAsPathGenerator(mainPath,router.asPath,{...queries, page})

            return (
                <Link key={page} href={{
                    pathname: mainPath,
                    query: {...queries, page},
                }} as={{
                    pathname: asPath,
                    query: asQuery
                }}><a className={classNameForActivePage}>{page}</a></Link>
            )
        }
    })


    if (props.isActive && props.totalCount > props.size) {
        // const queries = props.router ? props.router.query : {}
        // delete queries.metaType
        return (
            <div className='pagination'>
                {renderPaginationItems}
            </div>
        );
    } else return null

};
export default withRouter(PaginationComponent);
