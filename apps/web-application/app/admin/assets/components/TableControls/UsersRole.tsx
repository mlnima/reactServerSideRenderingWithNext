"use client";

import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'
import paramsObjectGenerator from '../paramsObjectGenerator';
import { userRoles } from '@repo/data-structures';
import { capitalizeFirstLetter } from '@repo/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';

const Style = styled.div`
  .assetControlItem {
    background-color: var(--tertiary-background-color);
    padding: 0.35rem 1rem;
    border-radius: 0.375rem;

    select {
      width: 100%;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border-color);
    }
  }
`;

interface PropTypes {}

const UsersRole: FC<PropTypes> = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const onRoleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const newQuery = { ...query, role: e.target.value };
      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    } else {
      const newQuery = { ...query };
      delete newQuery.role;
      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    }
  };

  return (
    <Style className="assetControlItem">
      <select
        className={'primarySelect'}
        onChange={onRoleChangeHandler}
        value={query?.role || ''}
      >
        <option value="">Select</option>
        {userRoles.map(role => (
          <option key={role} value={role}>
            {capitalizeFirstLetter(role)}
          </option>
        ))}
      </select>
    </Style>
  );
};

export default UsersRole;
// import React, {FC, useMemo} from "react";
// import styled from "styled-components";
// import {useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "../paramsObjectGenerator";
// import { userRoles } from '@repo/data-structures';
// import {capitalizeFirstLetter} from "@repo/utils";
//
// const Style = styled.div``;
//
// interface PropTypes {
// }
//
// const UsersRole: FC<PropTypes> = ({}) => {
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(() => paramsObjectGenerator(search), [search]);
//
//     const onRoleChangeHandler = (e: React.ChangeEvent<any>) => {
//         if (e.target.value) {
//             setSearch({ ...query, role: e.target.value });
//         } else {
//             const newQuery = { ...query };
//             delete newQuery.role;
//             setSearch({ ...newQuery });
//         }
//     };
//
//     return (
//         <Style className="assetControlItem">
//             <select className={'primarySelect'} onChange={onRoleChangeHandler}>
//                 <option value="">Select</option>
//                 {userRoles.map(role=>(
//                     <option key={role} value={role}>
//                         {capitalizeFirstLetter(role)}
//                     </option>
//                 ))}
//             </select>
//
//     </Style>
//     )
// };
// export default UsersRole;
