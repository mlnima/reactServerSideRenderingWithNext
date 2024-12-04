import React, { FC } from 'react';
import Link from 'next/link';
import { ISuggestion } from '@repo/typescript-types';

interface IProps {
  suggestions: ISuggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<ISuggestion[]>>;
}

const SearchbarKeywordSuggestions: FC<IProps> = ({
  suggestions,
  setSuggestions,
}) => {
  return (
    <div className={'SearchbarKeywordSuggestions'}>
      {suggestions.map((suggestion: ISuggestion) => {
        return (
          <div className={'SearchbarKeywordSuggestion'} key={suggestion?.name}>
            <Link
              href={`/search/${suggestion?.name}`}
              onClick={() => setSuggestions([])}
            >
              <span> {suggestion?.name}</span>
              <span> {suggestion?.count}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default SearchbarKeywordSuggestions;
