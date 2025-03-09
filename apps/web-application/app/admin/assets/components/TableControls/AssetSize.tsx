"use client";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Store } from "@repo/typescript-types";
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from "react";
import paramsObjectGenerator from "../paramsObjectGenerator";
import { usePathname, useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';

const Styled = styled.div`
  width: 100px;
  select {
    width: 100%;
  }
`;

const AssetSize: React.FC = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [currentSize, setCurrentSize] = useState<number>(20);

  // Create a memoized query object using paramsObjectGenerator
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000];

  const { initialSettings } = useSelector(({ settings }: Store) => settings);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setCurrentSize(parseInt(newSize));
    const newQuery = { ...query, size: newSize };

    router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });

  };

  useEffect(() => {
    setCurrentSize(parseInt(query.size || initialSettings?.contentSettings?.contentPerPage || '20'));
  }, [query, initialSettings]);

  return (
    <Styled className={'assetControlItem'}>
      <select className={'primarySelect'} value={currentSize} onChange={onChangeHandler}>
        {range.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
    </Styled>
  );
};

export default AssetSize;
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {Store} from "@repo/typescript-types";
// import {useSearchParams} from "react-router-dom";
// import React, {useEffect, useMemo, useState} from "react";
// import paramsObjectGenerator from "../paramsObjectGenerator";
//
// const Styled = styled.div`
//   width: 100px;
//   select{
//     width: 100%;
//   }
//
// `
//
// const AssetSize = () => {
//     const [currentSize, setCurrentSize] = useState(20)
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(() => paramsObjectGenerator(search), [search])
//
//     const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]
//
//     const {initialSettings} = useSelector(({settings}: Store) => settings)
//
//     const onChangeHandler = (e: React.ChangeEvent<any>) => {
//         setSearch({...query, size: e.target.value})
//     }
//
//     useEffect(() => {
//         setCurrentSize(parseInt(query.size) || initialSettings?.contentSettings?.contentPerPage || 20 )
//     }, [query]);
//
//     return (
//         //@ts-ignore
//         <Styled className={'assetControlItem'}>
//             <select className={'primarySelect'}
//                     value={currentSize}
//                     onChange={e => onChangeHandler(e)}>
//
//                 {range.map(unit => {
//                     return <option value={unit} key={unit}>{unit}</option>
//                 })}
//             </select>
//         </Styled>
//
//     );
// };
// export default AssetSize;
