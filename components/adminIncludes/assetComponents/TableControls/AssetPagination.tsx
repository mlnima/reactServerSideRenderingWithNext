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

const AssetPagination = ({assetPageData}) => {
    const manualPage = useRef(null)
    const {pathname, push, query} = useRouter()


    const onManuallyPageChangeHandler = () => {
        push({pathname: pathname, query: {...query, page: manualPage.current.value}}).finally()
    }

    return (
        <AssetPaginationStyledDiv className='asset-page-pagination'>
            <label>{assetPageData.totalCount}</label>

            <Link href={{pathname: pathname, query: {...query, page: 1}}} className='btn btn-navigation'>
                1
            </Link>

            <Link className='btn btn-navigation'
                  href={{
                      pathname: pathname,
                      query: {...query, page: query.page ? parseInt(query.page as string) - 1 : 1}
                  }}>
                {'<'}
            </Link>

            <input ref={manualPage}
                   placeholder={query.page as string || '1'}
                   type='number'
                   className='form-control-input'
            />

            <button className='btn btn-navigation'
                    onClick={onManuallyPageChangeHandler}>
                Go
            </button>

            <Link className='btn btn-navigation'

                  href={{
                      pathname: pathname,
                      query: {...query, page: query.page ? parseInt(query.page as string) + 1 : 2}
                  }}>
                {'>'}
            </Link>

            <Link className='btn btn-navigation'
                  href={{
                      pathname: pathname,
                      query: {
                          ...query,
                          page: Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size as string || '30'))
                      }
                  }}
            >

                {Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size as string || '30'))}

            </Link>
        </AssetPaginationStyledDiv>
    );
};
export default AssetPagination;
