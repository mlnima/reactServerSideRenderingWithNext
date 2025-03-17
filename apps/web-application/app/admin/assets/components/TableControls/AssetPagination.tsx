"use client";
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';

const AssetPaginationStyledDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-navigation {
        margin: 0 2px;
    }
`;

interface PropTypes {
  assetPageData: any;
}

const AssetPagination: FC<PropTypes> = ({ assetPageData }) => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const size = parseInt(searchParams.get('size') ?? "20");
  const currentPage = parseInt(searchParams.get('page') ?? "1");
  const assetsType = searchParams.get('assetsType') ;

  const maxPage = useMemo(() => {
    return Math.ceil(parseInt(assetPageData.totalCount) / size);
  }, [assetPageData, searchParams]);

  const handleSetSearch = (newQuery: { [key: string]: string }) => {
    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  return (
    <AssetPaginationStyledDiv className="assetControlItem">
      <p>
        {assetPageData.totalCount} { assetsType ? capitalizeFirstLetter(assetsType) : ''}
      </p>
      <button onClick={() => handleSetSearch({ page: '1' })} className="btn btn-navigation">
        1
      </button>
      <button onClick={() => handleSetSearch({ page: (currentPage - 1).toString() })} className="btn btn-navigation" disabled={currentPage === 1}>
        {'<'}
      </button>
      <input
        value={currentPage}
        onChange={(e) => {
          const newPage = parseInt(e.target.value, 10) || 1;
          handleSetSearch({ page: newPage.toString() });
        }}
        placeholder={currentPage.toString()}
        type={'number'}
        className={'primaryInput'}
      />
      <button onClick={() => handleSetSearch({ page: (currentPage + 1).toString() })} className="btn btn-navigation" disabled={currentPage === maxPage}>
        {'>'}
      </button>
      <button onClick={() => handleSetSearch({ page: maxPage.toString() })} className="btn btn-navigation">
        {maxPage}
      </button>
      <p>Pages</p>
    </AssetPaginationStyledDiv>
  );
};

export default AssetPagination;