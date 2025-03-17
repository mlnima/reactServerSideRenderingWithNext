'use client';

import React, { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { userRoles } from '@repo/data-structures';
import { capitalizeFirstLetter } from '@repo/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString,removeQueryParam } from '@repo/utils';


const Style = styled.div`
    .assetControlItem {
        background-color: var(--tertiary-background-color);
        padding: 0.35rem 1rem;
        border-radius: 0.375rem;

        select {
            width: 100%;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            border: 1px solid var(--default-border-color);
        }
    }
`;

interface PropTypes {
}

const UsersRole: FC<PropTypes> = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onRoleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {

      router.push(pathname + '?' + createQueryString([
        {name:'role', value:e.target.value},
        {name:'page', value:'1'},
      ], searchParams), { scroll: false });


    } else {
      router.push(pathname + '?' + removeQueryParam('role', searchParams), { scroll: false });
    }
  };

  return (
    <Style className="assetControlItem">
      <select
        className={'primarySelect'}
        onChange={onRoleChangeHandler}
        value={searchParams.get('role') || ''}
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
