import React, {useState} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from 'next-i18next';

const SearchButtonStyledDiv = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 10px;
  height: 48px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, .9);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props: { open: boolean }) => props.open ? `animation: searchbarFall .3s linear alternate;` : `animation: none;`}
  .search-button-widget-form {
    max-width: 400px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 95%;

    .search-button-widget-form-submit-btn {
      right: 0;
      top: 0;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      outline: none;
      color: var(--navigation-text-color, #ccc);
      font-size: 1rem;
      margin: 0 5px;

    }

    .search-button-widget-close-btn {
      color: var(--navigation-text-color, #ccc);
      margin: 0 5px;
    }
  }
`

interface SearchButtonFormPropTypes {
    open: boolean,
    onOpenHandler: any,
}

const SearchButtonForm = ({open, onOpenHandler}: SearchButtonFormPropTypes) => {
    const {t} = useTranslation('common');
    const router = useRouter()
    const [state, setState] = useState({
        keyword: '',
        isOpen: false
    });
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

    const onChangeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    return (
        <SearchButtonStyledDiv open={open} className={'search-button-widget-form-clientActions'}>

            <form className={'search-button-widget-form'} onSubmit={e => onSearchHandler(e)}>
                <input type="text"
                       onChange={e => onChangeHandler(e)}
                       name='keyword' value={state.keyword}
                       className='search-button-widget-form-keyword-input form-control-input'
                       placeholder={t('Search...')}
                />
                <button type='submit'
                        className='search-button-widget-form-submit-btn'
                        title={t('Search')}
                >
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
                <span className='search-button-widget-close-btn' title={t('Close')}>
                           <FontAwesomeIcon onClick={onOpenHandler}
                                            style={{width: '24px', height: '24px',}}
                                            icon={faTimes}
                           />
                 </span>
            </form>
        </SearchButtonStyledDiv>
    )
};
export default SearchButtonForm;
