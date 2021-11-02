import React, {useRef} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import styled from "styled-components";

const AssetPaginationStyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  label {
    margin: 0 10px;
  }
  .btn-navigation {
    margin: 0 2px;
  }
`

const AssetPagination = props => {
    const manualPage = useRef(null)
    const router = useRouter()
    return (
        <AssetPaginationStyledDiv className='asset-page-pagination'>
            <label>{props.finalPageData.totalCount}</label>
            <Link href={{
                pathname: props.pathname || router.pathname, query: {...router.query, page: 1}
            }}><a className='btn btn-navigation'>{'<<'} </a></Link>
            <Link href={{
                pathname: props.pathname || router.pathname, query: {...router.query, page: router.query.page ? parseInt(router.query.page) - 1 : 1}
            }}><a className='btn btn-navigation'>{'<'}  </a></Link>
            <input ref={manualPage} placeholder={router.query.page ? router.query.page : 1} type='number' className='form-control-input'/>
            <button className='btn btn-navigation' onClick={() => {
                router.push({pathname: router.pathname, query: {...router.query, page: manualPage.current.value}})
            }}>Go
            </button>
            <Link href={{
                pathname: props.pathname || router.pathname, query: {...router.query, page: router.query.page ? parseInt(router.query.page) + 1 : 2}
            }}><a className='btn btn-navigation'>{'>'} </a></Link>
            <Link href={{
                pathname: props.pathname || router.pathname,
                query: {
                    ...router.query, page: Math.ceil(parseInt(props.finalPageData.totalCount) /
                        (router.query.size ? parseInt(router.query.size) : 30))

                }
            }}><a className='btn btn-navigation'>{'>>'}  </a></Link>
        </AssetPaginationStyledDiv>
    );
};
export default AssetPagination;
