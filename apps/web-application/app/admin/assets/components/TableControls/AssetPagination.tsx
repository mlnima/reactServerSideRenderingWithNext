'use client';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { capitalizeFirstLetter, createQueryString } from '@repo/utils';
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
  totalCount: number;
}

const AssetPagination: FC<PropTypes> = ({ totalCount = 0 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const size = parseInt(searchParams.get('size') ?? '20');
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const assetsType = searchParams.get('assetsType');

  const maxPage = useMemo(() => {
    return Math.ceil(totalCount / size);
  }, [totalCount, searchParams]);

  const handleSetSearch = (newQuery: { [key: string]: string }) => {
    router.push(_updateSearchParams({ newQuery, searchParams, pathname }), { scroll: false });
  };

  const onSearchHandler = (targetPage: number) => {
    router.push(pathname + '?' + createQueryString([
      { name: 'page', value: targetPage.toString() },
    ], searchParams), { scroll: false });
  };


  return (
    <AssetPaginationStyledDiv className="assetControlItem">
      <p>
        {totalCount} {assetsType ? capitalizeFirstLetter(assetsType) : ''}
      </p>
      <button onClick={() => onSearchHandler(1)} className="btn btn-navigation">
        1
      </button>
      <button onClick={() => onSearchHandler(currentPage - 1)} className="btn btn-navigation"
              disabled={currentPage === 1}>
        {'<'}
      </button>
      <input
        value={currentPage}
        onChange={(e) => {
          const newPage = parseInt(e.target.value, 10) || 1;
          onSearchHandler(newPage);
        }}
        placeholder={currentPage.toString()}
        type={'number'}
        className={'primaryInput'}
      />
      <button onClick={() => onSearchHandler(currentPage + 1)} className="btn btn-navigation"
              disabled={currentPage === maxPage}>
        {'>'}
      </button>
      <button onClick={() => onSearchHandler(maxPage)} className="btn btn-navigation">
        {maxPage}
      </button>
      <p>Pages</p>
    </AssetPaginationStyledDiv>
  );
};

export default AssetPagination;