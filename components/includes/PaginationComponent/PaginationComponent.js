import React from 'react';
import PaginationComponentPageLink from "./PaginationComponentPageLink";
import {rangeNumGenerator} from "../../../_variables/_variables";
import {useRouter} from "next/router";
import _ from "lodash";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
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
`
const PaginationComponent = props => {
    const router = useRouter()
    if (props.isActive && props.totalCount > props.size) {
        const range  = rangeNumGenerator(props.currentPage, props.maxPage).filter(n=>(n !== (1||props.maxPage)) && (n < props.maxPage) && (n>0) )
       // console.log(props.currentPage,props.maxPage)
        const rangeWithMinMax =  [1,...range,props.maxPage]
        const metaType = router.query.metaType
        const metaName = router.query.metaName


        const mainPath =  router.asPath.includes('/posts') || router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ? '/posts' : '/meta'

        const asPath =   router.asPath.includes('/tags/') || router.asPath.includes('/categories/') || router.asPath.includes('/actors/') ?  `/${metaType}/${metaName}`:
                         router.asPath.includes('/tags') ||  router.asPath.includes('/categories') || router.asPath.includes('/actors')   ?   `/${metaType}` :
                         router.pathname;

        const content = router.query.content ? {content:router.query.content} :{}



        return (
            <StyledDiv className='pagination' key={props.paginationIndex}>
                {
                    rangeWithMinMax.map(pageNumber => {
                        return (
                            <PaginationComponentPageLink mainPath={mainPath} asPath={asPath} content={content}  {...props} key={_.uniqueId('id_')}  pageNumber={pageNumber}/>
                        )
                    })
                }
            </StyledDiv>
        );
    } else return null

};
export default PaginationComponent;
