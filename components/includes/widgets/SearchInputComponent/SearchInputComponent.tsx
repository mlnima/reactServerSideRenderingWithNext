import React, {FC, useState} from 'react';
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
  width: clamp(100px, 100%, 400px);
  font-size: 1em;
  position: relative;

  .form-control-input {
    border: none;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    width: clamp(250px, 400px, 600px);
    font-size: 1em;
  }
`


const SearchInputComponent: FC = () => {
    const {t} = useTranslation('common');
    const router = useRouter()

    const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

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
            router.push({
                pathname: `/search/${state.keyword}`,
                query: {
                    page: 1
                }
            })
        }
    }

    if (isMobile) {
        return <SearchButton/>
    } else return (
        <SearchInputComponentStyledForm className='search-bar' onSubmit={e => onSearchHandler(e)}>
            <input className='form-control-input'
                   type='text' name='keyword'
                   onChange={e => onChangeHandler(e)}
                   value={state.keyword}
                   placeholder={t('Search...')}
            />
            <button className='btn btn-primary' aria-label='search' type='submit'>
                {t('Search')}
            </button>
        </SearchInputComponentStyledForm>
    )

};

export default SearchInputComponent;

