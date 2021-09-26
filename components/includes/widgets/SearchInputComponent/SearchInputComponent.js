import React, {useState} from 'react';
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const SearchInputComponentStyledForm = styled.form`
  display: flex;
  height: 35px;
  width: clamp(100px, 200px, 400px);
  font-size: 1em;

  .search-input {
    display: flex;
    justify-content: center;
    width: 80%;
    margin-right: 0;
    border: none;
    padding: 0 5px;

    &:focus {
      outline: none;
    }
  }

  .search-button {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    padding: 0.2em;
    margin-left: 0;
    border: none;
    color: var(--main-text-color);
    background-color: var(--main-active-color,#f90);
    &:focus {
      outline: none;
    }
    &:active {
      border: none;
    }
  }
  
  @media only screen and (min-width: 768px) {
    display: flex;
    height: 24px;
    width: clamp(250px, 400px, 600px);
    font-size: 1em;
  }
`
const SearchInputComponent = ({t}) => {
    const router = useRouter()
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
        if (state.keyword.length > 2) {
            router.push({
                pathname: `/search/${state.keyword}`,
                query: {
                    page: 1
                }
            })
        }
    }

    return (
            <SearchInputComponentStyledForm className='search-bar' onSubmit={e => onSearchHandler(e)}>
                <input className='search-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder={t([`common:Search...`])}/>
                <button className='search-button' aria-label='Center Align' type='submit'>
                    {t([`common:Search`])}
                </button>
            </SearchInputComponentStyledForm>
    )

};

export default withTranslation(['common'])(SearchInputComponent);

