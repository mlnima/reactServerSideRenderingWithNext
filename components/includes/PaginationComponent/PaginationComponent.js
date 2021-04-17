import React from 'react';
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import {useRouter} from "next/router";
import _ from "lodash";
const PaginationComponent = props => {
    const router = useRouter()
    if (props.isActive && props.totalCount > props.size) {
        const range  = rangeNumGenerator(props.currentPage, props.maxPage).filter(n=>(n !== (1||props.maxPage)) && (n < props.maxPage) && (n>0) )
        const rangeWithMinMax =  [1,...range,props.maxPage]
        const contentType = router.query.contentType
        const contentName = router.query.contentName


        const mainPath =  router.asPath.includes('/posts') || router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/posts' : '/meta'

        const asPath =   router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ?  `/${contentType}/${contentName}`:
                         router.asPath.includes('/tags') ||  router.asPath.includes('/categories') || router.asPath.includes('/actors')   ?   `/${contentType}` :
                         router.pathname;

        const content = router.query.content ? {content:router.query.content} :{}



        return (
            <div className='pagination' key={props.paginationIndex}>
                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink mainPath={mainPath} asPath={asPath} content={content}  {...props} key={_.uniqueId('id_')}  pageNumber={pageNumber}/>
                        )
                    })
                }
            </div>
        );
    } else return null

};
export default PaginationComponent;
