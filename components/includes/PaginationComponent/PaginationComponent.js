import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router';
import _ from 'lodash'

const PaginationComponent = props => {
    useEffect(() => {
        console.log(props )


    }, [props]);
    const paginationRangeGenerator = (current,max)=>{
        return  current === 1 && max <= 2 ? [2] :
                current === 1 ? _.range(2, 8) :
                current === 2  && max <= 3 ? _.range(2 , 3) :
                current === 2 ? _.range(current , current + 6) :
                current === 3 ? _.range(current - 1, current + 5) :
                current === 4 ? _.range(current - 2, current + 4) :
                current >= 5 && current < max - 3 ? _.range(current - 3, current + 4) : current >= max - 3 ? _.range(max - 6, max) : 0
    }

    const renderPaginationItems= paginationRangeGenerator(props.currentPage,props.maxPage).map(page=>{
        if (props.router){
            return(
                <Link key={page} href={{
                    pathname:props.router.pathname,query:{...props.router.query,page}
                }}><a>{page}</a></Link>
            )
        }
    })

    if (props.isActive && props.totalCount > props.size) {
        return (
            <div className='pagination'>
                <Link key='...1' href={{
                    pathname:props.pathnameData,query:{...props.queryData,page:1}
                }}><a>1...</a></Link>
                {renderPaginationItems }
                <Link key={`...${props.maxPage}`} href={{
                    pathname:props.pathnameData,query:{...props.queryData,page:props.maxPage}
                }}><a>...{props.maxPage}</a></Link>
            </div>
        );
    } else return null

};
export default withRouter(PaginationComponent);
