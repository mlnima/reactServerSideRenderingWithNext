"use client";

import styled from "styled-components";
import React, { useMemo } from "react";
import { useRouter } from 'next/navigation'
import paramsObjectGenerator from "../paramsObjectGenerator";
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

const MetasType: React.FC = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams()
  const pathname = usePathname()

  //@ts-ignore
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuery = { ...query, metaType: e.target.value };
    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
  };

  return (
    <Style className='assetControlItem'>
      <p>Metas Type:</p>
      <select
        className={'primarySelect'}
        onChange={onFormatChangeHandler}
        value={query?.metaType || 'categories'} // Default to 'categories' if metaType is not set
      >
        <option value='categories'>Categories</option>
        <option value='tags'>Tags</option>
        <option value='actors'>Actors</option>
      </select>
    </Style>
  );
};

export default MetasType;
// import styled from "styled-components";
// import React, {useMemo} from "react";
// import {useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "../paramsObjectGenerator";
//
// const Style = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//
//   p {
//     margin: 0 10px;
//   }
// `
//
// const MetasType = () => {
//
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(()=>paramsObjectGenerator(search),[search])
//
//     const onFormatChangeHandler = (e:React.ChangeEvent<any>) => {
//         setSearch({...query,metaType: e.target.value})
//     }
//
//     return (
//         <Style className='assetControlItem'>
//             <p>Metas Type:</p>
//             <select className={'primarySelect'}
//                     onChange={e => onFormatChangeHandler(e)}
//                     value={query?.metaType}>
//                 <option value='categories' >Categories</option>
//                 <option value='tags'>Tags</option>
//                 <option value='actors'>Actors</option>
//             </select>
//         </Style>
//     );
// };
// export default MetasType;