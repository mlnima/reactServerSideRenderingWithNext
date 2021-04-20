import React, { useRef } from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .asset-page-pagination-item {
    margin: 5px;
    border: 1px solid rgba(0,0,0,.1);
    padding: 3px 5px;
  }
  .asset-page-pagination-item-input{
    border: 1px solid rgba(0,0,0,.1);
    padding: 3px 5px;
    background-color: $light100;
    width: 50px;
  }
  .asset-page-pagination-item-btn{
    border: 1px solid rgba(0,0,0,.1);
    padding: 3px 5px;
  }
`;


const AssetPagination = props => {
    const manualPage = useRef(null)
    const router = useRouter()
    return (
        <StyledDiv className='asset-page-pagination'>
            <label>{props.finalPageData.totalCount}</label>
            <Link  href={ {
                pathname: props.pathname || router.pathname, query: { ...router.query, page: 1 }
            } }><a className='asset-page-pagination-item'>{'<<'} </a></Link>
            <Link  href={ {
                pathname: props.pathname || router.pathname, query: { ...router.query, page: router.query.page ? parseInt(router.query.page) -1: 1 }
            } }><a className='asset-page-pagination-item'>{'<'}  </a></Link>
            <input ref={manualPage} placeholder={router.query.page?router.query.page:1} type='number' className='asset-page-pagination-item-input'/>
            <button className='asset-page-pagination-item-btn' onClick={()=>{router.push({pathname:router.pathname,query:{...router.query,page:manualPage.current.value}})}}>Go</button>
            <Link  href={ {
                pathname: props.pathname || router.pathname, query: { ...router.query, page: router.query.page ? parseInt(router.query.page) +1: 2 }
            } }><a className='asset-page-pagination-item'>{'>'} </a></Link>
            <Link  href={ {
                pathname: props.pathname || router.pathname,
                query: {
                    ...router.query, page:Math.ceil(parseInt(props.finalPageData.totalCount) /
                        (router.query.size?parseInt(router.query.size):30))

                }
            } }><a className='asset-page-pagination-item'>{'>>'}  </a></Link>
        </StyledDiv>
    );
};
export default AssetPagination;
