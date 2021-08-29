import React, {useState} from 'react';

import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {withTranslation} from "next-i18next";

import styled from "styled-components";
const SearchInputComponentStyledDiv = styled.div`
  .search-bar {
    display: flex;
    height: 35px;
    width: clamp(100px, 200px, 400px);
    font-size: 1em;
  }

  .search-input {
    display: flex;
    justify-content: center;
    width: 80%;
    margin-right: 0;
    border: none;
    padding: 0 5px;
  }

  .search-input:focus {
    outline: none;
  }

  .search-bar-btn {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    outline: none;
    padding: 0.2em;
    margin-left: 0;
    border: none;
    color: var(--main-text-color);
  }

  .search-bar-btn:focus {
    outline: none;
  }

  .search-bar-btn:active {
    border: none;
  }

  .search-bar-btn-open {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    outline: none;
  }

  .search-bar-btn-open {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    outline: none;
  }

  @media only screen and (min-width: 768px) {
    .search-bar {
      display: flex;
      height: 24px;
      width: clamp(250px, 400px, 600px);
      font-size: 1em;
    }
  }
`
const SearchInputComponent = ({t,mobileMode}) => {
    const router = useRouter()
    const [state, setState] = useState({
        keyword: '',
        isOpen: false
    });
    const openStatus = !mobileMode

    const [isOpen, setIsOpen] = useState(openStatus)

    const onChangeHandler = e => {
        setState({
            ...state,
            keyword: e.target.value
        })
    }

    const onSearchHandler = e => {
        e.preventDefault()
        if (state.keyword.length > 2){
            router.push({
                pathname: `/search/${state.keyword}`,
                query: {
                    page: 1
                }
            })
        }
    }


    const onOpenCloseHandler = e => {
        e.preventDefault()
        isOpen ?
            setIsOpen(false) :
            setIsOpen(true)
    }


    return (
        <SearchInputComponentStyledDiv>

            {isOpen || !mobileMode ?
                <form className='search-bar' onSubmit={e => onSearchHandler(e)}>
                    {mobileMode ?
                        <button className='search-bar-btn-close' aria-label='Center Align' onClick={(e) => onOpenCloseHandler(e)}>
                            <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faTimes} className='search-bar-btn-open-svg'/>
                        </button> : null}
                    <input className='search-input' type='text' name='keyword' onChange={e => onChangeHandler(e)} value={state.keyword} placeholder={t([`common:Search`])}/>
                    <button className='search-bar-btn' aria-label='Center Align' type='submit'><FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faSearch} title={t([`common:Search`])}/></button>
                </form> :
                <button className='search-bar-btn-open' aria-label='Center Align' onClick={(e) => onOpenCloseHandler(e)}>
                    <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faSearch} className='search-bar-btn-open-svg'/>
                </button>
            }

        </SearchInputComponentStyledDiv>
    )


};

export default  withTranslation(['common'])(SearchInputComponent);

