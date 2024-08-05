import { FC } from 'react';
import Link from 'next/link';

interface IProps {
    suggestions: {}[];
    setSuggestions:Function
}

const SearchbarKeywordSuggestions: FC<IProps> = ({ suggestions,setSuggestions }) => {
    return (
        <div className={'SearchbarKeywordSuggestions'}>
            {suggestions.map(suggestion => {
                return (
                    <div className={'SearchbarKeywordSuggestion'}>
                        <Link href={`/search/${suggestion?.name}`} onClick={()=>setSuggestions([])}>
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
