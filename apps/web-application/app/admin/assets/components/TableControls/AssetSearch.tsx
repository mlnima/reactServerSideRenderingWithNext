"use client";
import React, { FC, useMemo, useState } from 'react';
import styled from "styled-components";
import { usePathname, useRouter,useSearchParams } from 'next/navigation';
import paramsObjectGenerator from "../paramsObjectGenerator";

import { _updateSearchParams } from '@lib/navigationTools';

const StyledForm = styled.form`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 300px;

    .primaryInput {
        width: 160px;
    }

    .btn-navigation {
        margin: 0 2px;
    }
`;

const AssetSearch: FC = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState('');

  // Create a memoized query object using paramsObjectGenerator
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = { ...query, keyword };
    delete newQuery.page; // Remove page parameter to reset pagination
    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  const onDeleteKeywordHandler = () => {
    if (keyword) {
      setKeyword('');
      const newQuery = { ...query };
      delete newQuery.keyword;
      delete newQuery.metaId;
      delete newQuery.page;

      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    }
  };

  return (
    <StyledForm className={'assetControlItem'} onSubmit={onSubmitHandler}>
      <input
        className={'primaryInput'}
        value={keyword}
        type={'text'}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={'btn btn-navigation'}>Search</button>
      {keyword ? (
        <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span>
      ) : null}
    </StyledForm>
  );
};

export default AssetSearch;


// import React, {FC, useMemo, useState} from 'react';
// import styled from "styled-components";
// import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "../paramsObjectGenerator";
//
//
// let StyledForm = styled.form`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   max-width: 300px;
//
//   .primaryInput {
//     width: 160px;
//   }
//
//   .btn-navigation {
//     margin: 0 2px;
//   }
// `;
//
// const AssetSearch: FC = () => {
//
//     const [keyword, setKeyword] = useState('')
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(()=>paramsObjectGenerator(search),[search])
//
//     const onSubmitHandler = (e:React.FormEvent) => {
//         const queryData = { ...query, keyword };
//         delete queryData.page;
//
//         e.preventDefault()
//         setSearch({...queryData})
//     }
//
//     const onDeleteKeywordHandler = () => {
//         if (keyword) {
//             setKeyword('')
//             const  resetQueries = query
//             delete resetQueries.keyword
//             delete resetQueries.metaId
//             delete resetQueries.page
//             setSearch({...resetQueries})
//         }
//     }
//
//     return (
//
//         <StyledForm className={'assetControlItem'} onSubmit={e => onSubmitHandler(e)}>
//
//             <input className={'primaryInput'}
//                    value={keyword}
//                    type={'text'}
//                    onChange={e => setKeyword(e.target.value)}
//             />
//             <button className={'btn btn-navigation'}>Search</button>
//             {keyword ? <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span> : null}
//         </StyledForm>
//     );
// };
// export default AssetSearch;
