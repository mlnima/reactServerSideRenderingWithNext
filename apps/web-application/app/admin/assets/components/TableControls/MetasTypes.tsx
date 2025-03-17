"use client";

import styled from "styled-components";
import React from "react";
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString } from '@repo/utils';

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

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;

    router.push(pathname + '?' + createQueryString([
      {name:'metaType', value:e.target.value},
      {name:'page', value:'1'},
    ], searchParams), { scroll: false });
  };

  return (
    <Style className='assetControlItem'>
      <p>Metas Type:</p>
      <select
        className={'primarySelect'}
        onChange={onFormatChangeHandler}
        value={searchParams.get('metaType') || 'categories'} // Default to 'categories' if metaType is not set
      >
        <option value='categories'>Categories</option>
        <option value='tags'>Tags</option>
        <option value='actors'>Actors</option>
      </select>
    </Style>
  );
};

export default MetasType;
