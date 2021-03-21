import React from 'react';
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import {useRouter} from "next/router";
const PaginationComponent = props => {
    const router = useRouter()
    if (props.isActive && props.totalCount > props.size) {
        const range  = rangeNumGenerator(props.currentPage, props.maxPage).filter(n=>(n !== (1||props.maxPage)) && (n < props.maxPage) && (n>0) )
        const rangeWithMinMax =  [1,...range,props.maxPage]

        const contentType = router.asPath.includes('tags') ? 'tags':
            router.asPath.includes('categories') ? 'categories':
                router.asPath.includes('actors') ? 'actors': 'tags'

        const mainPath =  router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/posts' : '/meta'

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
            <div className='pagination' key={props.paginationIndex}>
                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink mainPath={mainPath} asPath={asPath} content={content} asQuery={asQuery}   {...props} key={pageNumber}  pageNumber={pageNumber}/>
                        )
                    })
                }
            </div>
        );
    } else return null

};
export default PaginationComponent;
