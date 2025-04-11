'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { userRoles } from '@repo/data-structures';
import { capitalizeFirstLetter } from '@repo/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString, removeQueryParam } from '@repo/utils';
import './ContentUsersRoleFilter.scss';

const ContentUsersRoleFilter = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onRoleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {

      router.push(pathname + '?' + createQueryString([
        { name: 'role', value: e.target.value },
        { name: 'page', value: '1' },
      ], searchParams), { scroll: false });


    } else {
      router.push(pathname + '?' + removeQueryParam('role', searchParams), { scroll: false });
    }
  };

  return (
    <div id={'ContentUsersRoleFilter'} className="assetControlItem">
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
    </div>
  );
};

export default ContentUsersRoleFilter;
