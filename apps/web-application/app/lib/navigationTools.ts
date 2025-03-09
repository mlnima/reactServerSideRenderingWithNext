import { ReadonlyURLSearchParams } from 'next/navigation';

interface ISetSearchParamsByObj {
  newQuery: {
    [key: string]: string
  },
  searchParams: ReadonlyURLSearchParams,
  pathname: string,
}

export const _updateSearchParams  = (
  {
    newQuery,
    searchParams,
    pathname,
  }: ISetSearchParamsByObj) => {

  const params = new URLSearchParams(searchParams);

  Object.entries(newQuery).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return `${pathname}?${params.toString()}`;
};


