import React, {FC, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
const SearchButton = dynamic(() => import('../SearchButton/SearchButton'));

const SearchInputComponentStyledForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1em;
  width: 100%;

  .search-bar-search-btn {
    position: absolute;
    left: 0;
    right: 0;
    width: 40px;
    height: 26px;
    background-color: transparent;
    color: var(--navigation-text-color, #ccc);
    border: none;

    svg {
      width: 20px;
      height: 26px;
      color: var(--navigation-text-color, #ccc);
    }
  }

  .search-bar-input {
    width: 100%;
    height: 26px;
    border-radius: 0 3px 3px 0;
    -moz-border-radius: 0 3px 3px 0;
    -webkit-border-radius: 0 3px 3px 0;
    -ms-border-radius: 0 3px 3px 0;
    -o-border-radius: 0 3px 3px 0;
    border: none;
    color: #fff;
    background-color: #252525;
    display: inline-block;
    font-size: 14px;
    outline: 0;
    vertical-align: top;
    box-sizing: border-box;
    padding-left: 60px;
    text-decoration: none;
  }

`

interface SearchInputPropTypes{
    uniqueData:{
       switchToButtonOnMobile:boolean
    }
}

const SearchInput: FC<SearchInputPropTypes> = ({uniqueData}) => {
    const {t} = useTranslation('common');
    const router = useRouter()

    const isMobileDevice = useSelector((store: StoreTypes) => store.settings?.isMobile)
    const isMobile = useMemo(()=>isMobileDevice,[])

    const [state, setState] = useState({
        keyword: '',
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            keyword: e.target.value
        })
    }

    const onSearchHandler = e => {
        e.preventDefault()
        if (state?.keyword?.length > 2) {
            router?.push({
                pathname: `/search/${state.keyword}`,
                query: {
                    page: 1
                }
            })
        }
    }

    if (isMobile && uniqueData?.switchToButtonOnMobile) {
        return <SearchButton/>
    } else return (

        <SearchInputComponentStyledForm className='search-bar' onSubmit={e => onSearchHandler(e)}>
            <button className='search-bar-search-btn' aria-label='search' type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="search-bar-btn-open-svg">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
            </button>
            <input className='search-bar-input'
                   type='text' name='keyword'
                   onChange={e => onChangeHandler(e)}
                   value={state.keyword}
                   placeholder={t<string>('Search...')}
            />
        </SearchInputComponentStyledForm>
    )

};

export default SearchInput;

