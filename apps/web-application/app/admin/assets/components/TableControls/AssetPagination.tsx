"use client";
import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import paramsObjectGenerator from '../paramsObjectGenerator';
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
  // Create a memoized query object using paramsObjectGenerator
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const maxPage = useMemo(() => {
    return Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size ? (query.size as string) : '20'));
  }, [assetPageData, searchParams]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
  }, [searchParams]);

  const handleSetSearch = (newQuery: { [key: string]: string }) => {
    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  return (
    <AssetPaginationStyledDiv className="assetControlItem">
      <p>
        {assetPageData.totalCount} {capitalizeFirstLetter(query.assetsType)}
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
          setCurrentPage(newPage);
        }}
        placeholder={(query.page as string) || '1'}
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
// import React, { FC, useEffect, useMemo, useState } from 'react';
// import styled from 'styled-components';
// import { useSearchParams } from 'react-router-dom';
// import paramsObjectGenerator from '../paramsObjectGenerator';
// import { capitalizeFirstLetter } from '@repo/utils';
//
// const AssetPaginationStyledDiv = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//
//     .btn-navigation {
//         margin: 0 2px;
//     }
// `;
//
// interface PropTypes {
//     assetPageData: any;
// }
//
// const AssetPagination: FC<PropTypes> = ({ assetPageData }) => {
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(() => paramsObjectGenerator(search), [search]);
//     const maxPage = useMemo(() => {
//         return Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size ? (query.size as string) : '20'));
//     }, [assetPageData]);
//
//     useEffect(() => {
//         setCurrentPage(parseInt(query.page) || 1);
//     }, [query.page]);
//
//     return (
//         <AssetPaginationStyledDiv className="assetControlItem">
//             <p>
//                 {assetPageData.totalCount} {capitalizeFirstLetter(query.assetsType)}
//             </p>
//             <button onClick={() => setSearch({ ...query, page: 1 })} className="btn btn-navigation">
//                 1
//             </button>
//
//             <button onClick={() => setSearch({ ...query, page: currentPage - 1 })} className="btn btn-navigation">
//                 {'<'}
//             </button>
//
//             <input
//                 value={currentPage}
//                 onChange={e => setSearch({ ...query, page: e.target.value || 1 })}
//                 placeholder={(query.page as string) || '1'}
//                 type={'number'}
//                 className={'primaryInput'}
//             />
//
//             <button onClick={() => setSearch({ ...query, page: currentPage + 1 })} className="btn btn-navigation">
//                 {'>'}
//             </button>
//
//             <button
//                 onClick={() =>
//                     setSearch({
//                         ...query,
//                         page: maxPage,
//                     })
//                 }
//                 className="btn btn-navigation"
//             >
//                 {maxPage}
//             </button>
//             <p>Pages</p>
//         </AssetPaginationStyledDiv>
//     );
// };
// export default AssetPagination;
