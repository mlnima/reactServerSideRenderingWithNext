import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router';
import _ from 'lodash'

const PaginationComponent = props => {


    const [range,setRange] = useState([])

    const [queries,setQueries] = useState({})

    // useEffect(() => {
    //     console.log('queries:', queries)
    //     console.log('state:', range)
    // }, [queries,range]);






    useEffect(() => {
        if(props.router){
            setRange([1, ...paginationRangeGenerator(props.currentPage, props.maxPage)])
            setQueries({
                ...queries,
                ...props.router.query
            })
        }
    }, [props.router]);


    const paginationRangeGenerator = (current, max) => {
        return current === 1 && max <= 2 ? [2] :
            current === 1 ? _.range(2, 8) :
                current === 2 && max <= 3 ? _.range(2, 3) :
                    current === 2 ? _.range(current, current + 6) :
                        current === 3 ? _.range(current - 1, current + 5) :
                            current === 4 ? _.range(current - 2, current + 4) :
                                current >= 5 && current < max - 3 ? _.range(current - 3, current + 4) : current >= max - 3 ? _.range(max - 6, max) : 0
    }

    const renderPaginationItems = range.map(page => {
        const mainPath = props.router ?
            props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/posts' :
                props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? '/meta' : '/posts' : '/posts';


        const asPath = !props.router ? '/posts' :
            props.router.asPath.includes('/tags/') || props.router.asPath.includes('/categories/') || props.router.asPath.includes('/actors/') ? '/' + queries.contentType + '/' + queries.contentName  :
                props.router.asPath.includes('/tags') ? '/tags' :
                    props.router.asPath.includes('/categories') ? '/categories' :
                        props.router.asPath.includes('/actors') ? '/actors' :
                            props.router.pathname;

        const mainQuery = !props.router ? {} :
            props.router.asPath.includes('/tags') || props.router.asPath.includes('/categories') || props.router.asPath.includes('/actors') ? {page: queries.page,content:queries.content} : {...props.queryData}


        // const asQuery = {
        //     content: queries.content ,
        //     page: page == 1 ? null : page,
        // }

        const asQuery = {keyword:queries.keyword?queries.keyword:undefined,page:props.router.query.page ?props.router.query.page:undefined,content:props.router.query.content ?props.router.query.content:undefined,}
        !asQuery.keyword ? delete asQuery.keyword  : null;
        // asQuery.page ==1 ? delete asQuery.page  : null;
        !asQuery.page ? delete asQuery.page  : null;
        !asQuery.content ? delete asQuery.content  : null;

        if (props.router) {
            page == 1 ? delete asQuery.page : null
            !asQuery.content ? delete asQuery.content : null

            return (
                <Link key={page} href={{
                    pathname: mainPath,
                    query: {...queries, page},
                }} as={{
                    pathname:asPath,
                    query: asQuery
                }}><a>{page}</a></Link>
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
