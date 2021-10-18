import React, {useState} from 'react';
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const SearchInputComponentStyledForm = styled.form`
  display: flex;
  align-items: center;
  width: clamp(100px, 200px, 400px);
  font-size: 1em;
  position: relative;
  
  .btn-primary {
    position: absolute;
    right: 0;
  }

  .form-control-input {
    border: none;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
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
            <input className='form-control-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder={t([`common:Search...`])}/>
            <button className='btn btn-primary' aria-label='Center Align' type='submit'>
                {t([`common:Search`])}
            </button>
        </SearchInputComponentStyledForm>
    )

};

export default withTranslation(['common'])(SearchInputComponent);

