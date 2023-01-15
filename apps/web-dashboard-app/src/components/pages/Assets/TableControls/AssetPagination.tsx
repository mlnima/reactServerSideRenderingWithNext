import React, {FC, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";

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

interface PropTypes {
    assetPageData: any
}

const AssetPagination: FC<PropTypes> = ({assetPageData}) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search])
    const maxPage = useMemo(() => {
        return Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size ? query.size as string : '20'))
    }, [assetPageData])

    useEffect(() => {
        setCurrentPage(parseInt(query.page) || 1)
    }, [query.page]);


    return (
        <AssetPaginationStyledDiv className='asset-page-pagination'>
            <label>{assetPageData.totalCount}</label>

            <button onClick={() => setSearch({...query, page: 1})} className='btn btn-navigation'>
                1
            </button>

            <button onClick={() => setSearch({...query, page: currentPage - 1})} className='btn btn-navigation'>
                {'<'}
            </button>

            <input value={currentPage}
                   onChange={(e) => setSearch({...query, page: e.target.value || 1})}
                   placeholder={query.page as string || '1'}
                   type='number'
                   className='form-control-input'
            />

            <button onClick={() => setSearch({...query, page: currentPage + 1})} className='btn btn-navigation'>
                {'>'}
            </button>

            <button onClick={() => setSearch({
                ...query,
                page: maxPage
            })
            } className='btn btn-navigation'>
                {maxPage}
            </button>

        </AssetPaginationStyledDiv>
    );
};
export default AssetPagination;
