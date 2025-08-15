'use client';
import React, { FC, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString, removeQueryParam } from '@repo/utils/dist/src';
import './AssetSearch.scss';

const AssetSearch: FC = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      pathname +
        '?' +
        createQueryString(
          [
            { name: 'keyword', value: keyword },
            { name: 'page', value: '1' },
          ],
          searchParams,
        ),
      { scroll: false },
    );
  };

  const onDeleteKeywordHandler = () => {
    if (keyword) {
      setKeyword('');
      router.push(pathname + '?' + removeQueryParam(['keyword', 'metaId', 'page'], searchParams), { scroll: false });
    }
  };

  return (
    <form className={'assetControlItem AssetSearch'} onSubmit={onSubmitHandler}>
      <input className={'primaryInput'} value={keyword} type={'text'} onChange={(e) => setKeyword(e.target.value)} />
      <button className={'btn btn-navigation'}>Search</button>
      {keyword ? (
        <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>
          X
        </span>
      ) : null}
    </form>
  );
};

export default AssetSearch;
