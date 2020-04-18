import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router';
import _ from 'lodash'

const PaginationComponent = props => {
    const [ state, setState ] = useState({
        queries: {},
        pathname: {}
    })

    useEffect(() => {
        let queries = props.router ? props.router.query : {}
        delete queries.metaType

        let pathname;
        if (props.queryData.metaType){
            pathname= props.router ? props.router.asPath :''
        }else{
            pathname=props.router?props.router.pathname:''
        }

        setState({
            ...state,
            queries,
            pathname
        })
    }, [props]);

    const paginationRangeGenerator = (current, max) => {
        return current === 1 && max <= 2 ? [ 2 ] :
            current === 1 ? _.range(2, 8) :
                current === 2 && max <= 3 ? _.range(2, 3) :
                    current === 2 ? _.range(current, current + 6) :
                        current === 3 ? _.range(current - 1, current + 5) :
                            current === 4 ? _.range(current - 2, current + 4) :
                                current >= 5 && current < max - 3 ? _.range(current - 3, current + 4) : current >= max - 3 ? _.range(max - 6, max) : 0
    }

    const renderPaginationItems = paginationRangeGenerator(props.currentPage, props.maxPage).map(page => {
        const path = props.router ? props.queryData.metaType ?  props.router.pathname +'/'+ props.queryData.metaType  : props.router.pathname : ''
        if (props.router) {
            return (
                <Link key={ page } href={ {
                    pathname: path,
                    query: { ...state.queries, page },
                    params: { ...props.queryData }
                } }><a>{ page }</a></Link>
            )
        }
    })

    // useEffect(() => {
    //     console.log(props)
    //     console.log(state)
    // }, [ props,state ]);

    if (props.isActive && props.totalCount > props.size) {
        const queries = props.router ? props.router.query : {}
        delete queries.metaType
        const path = props.router ? props.queryData.metaType ?  props.router.pathname +'/'+ props.queryData.metaType  : props.router.pathname : ''
        return (
            <div className='pagination'>
                <Link key='...1' href={ {
                    pathname: path, query: {  ...state.queries, page: 1 }
                } }><a>1...</a></Link>
                { renderPaginationItems }
                <Link key={ props.maxPage } href={ {
                    pathname: path, query: { ...state.queries, page: props.maxPage }
                } }><a>{ props.maxPage }</a></Link>
            </div>
        );
    } else return null

};
export default withRouter(PaginationComponent);
