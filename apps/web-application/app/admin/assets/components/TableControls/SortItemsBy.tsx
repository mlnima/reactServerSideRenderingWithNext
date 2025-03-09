"use client";

import styled from 'styled-components';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation'
import paramsObjectGenerator from '../paramsObjectGenerator';
import { usePathname, useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0 10px;
  }
`;

const SortItemsBy = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuery = { ...query, sort: e.target.value };
    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  return (
    <Style className='assetControlItem'>
      <p>Sort:</p>
      <select
        className={'primarySelect'}
        onChange={e => onFormatChangeHandler(e)}
        value={query?.sort || ''}
      >
        <option value=''>Select</option>
        <option value='createdAt'>Created At</option>
        <option value='-createdAt'>- Created At</option>
        <option value='updatedAt'>Updated At</option>
        <option value='-updatedAt'>- Updated At</option>
        {searchParams.get('assetsType') === 'meta' && (
          <>
            <option value='count'>Count</option>
          </>
        )}
        {searchParams.get('assetsType') === 'posts' && (
          <>
            <option value='disLikes'>Dislikes</option>
          </>
        )}
        {(searchParams.get('assetsType') === 'meta' || searchParams.get('assetsType') === 'posts') && (
          <>
            <option value='likes'>Likes</option>
            <option value='-likes'>- Likes</option>
            <option value='views'>Views</option>
            <option value='-views'>- Views</option>
            <option value={searchParams.get('assetsType') === 'meta' ? 'name' : 'title'}>Alphabetical</option>
            <option value={searchParams.get('assetsType') === 'meta' ? '-name' : '-title'}>- Alphabetical</option>
          </>
        )}
      </select>
    </Style>
  );
};

export default SortItemsBy;



// import styled from "styled-components";
// import React, {useMemo} from "react";
// import {useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";
//
// const Style = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//
//   p {
//     margin: 0 10px;
//
//   }
// `
// const SortItemsBy = () => {
//
//     const [search, setSearch] = useSearchParams();
//
//     //@ts-ignore
//     const query = useMemo(() => paramsObjectGenerator(search), [search])
//
//     const onFormatChangeHandler = (e: React.ChangeEvent<any>) => {
//         setSearch({...query, sort: e.target.value})
//     }
//
//
//     return (
//         <Style className='assetControlItem'>
//             <p>Sort:</p>
//             <select className={'primarySelect'} onChange={e => onFormatChangeHandler(e)} value={query?.sort}>
//                 <option value=''>Select</option>
//                 <option value='createdAt'>Created At</option>
//                 <option value='-createdAt'>- Created At</option>
//                 <option value='updatedAt'>Updated At</option>
//                 <option value='-updatedAt'>- Updated At</option>
//
//                 {search.get('query?.assetsType') === 'meta' &&
//                     <>
//                         <option value='count'>Count</option>
//                     </>
//                 }
//
//                 {search.get('assetsType') === 'posts' &&
//                     <>
//                         <option value='disLikes'>disLikes</option>
//                     </>
//                 }
//
//                 {(search.get('assetsType') === 'meta' || search.get('assetsType') === 'posts') &&
//                     <>
//
//                         <option value='likes'>Likes</option>
//                         <option value='-likes'>- Likes</option>
//                         <option value='views'>Views</option>
//                         <option value='-views'>- Views</option>
//                         <option value={search.get('assetsType') === 'meta' ? 'name' : 'title'}>Alphabetical</option>
//                         <option value={search.get('assetsType') === 'meta' ? '-name' : '-title'}>-Alphabetical</option>
//
//
//                     </>
//                 }
//
//
//             </select>
//         </Style>
//     );
// };
// export default SortItemsBy;