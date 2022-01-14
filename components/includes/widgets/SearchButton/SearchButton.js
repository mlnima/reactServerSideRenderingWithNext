import React, {useState} from 'react';
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const SearchButtonStyledButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  color: var(--navigation-text-color, #ccc);
`

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

  ${props => props.open ? `animation: searchbarFall .3s linear alternate;` : `animation: none;`}
  .search-button-widget-form {
    max-width: 400px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    .search-button-widget-form-submit-btn {
      right: 0;
      //padding: 3px;
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

const SearchButton = ({t}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false);

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

    const onOpenHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }


    return (
        <>
            <SearchButtonStyledButton onClick={onOpenHandler} className='search-button-widget-open-btn ' aria-label='Center Align' title={t([`common:Search`])}>
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
            </SearchButtonStyledButton>
            {open ?
                <SearchButtonStyledDiv open={open} className='search-button-widget-form-actions'>

                    <form className='search-button-widget-form' onSubmit={e => onSearchHandler(e)}>
                        <input type="text" onChange={e => onChangeHandler(e)} name='keyword' value={state.keyword} className='search-button-widget-form-keyword-input form-control-input' placeholder={t([`common:Search...`])}/>
                        <button type='submit' className='search-button-widget-form-submit-btn' title={t([`common:Search`])}>
                            <FontAwesomeIcon style={{width: '24px', height: '24px',}} icon={faSearch}/>
                        </button>
                        <span className='search-button-widget-close-btn' title={t([`common:Close`])}>
                           <FontAwesomeIcon onClick={onOpenHandler} style={{width: '24px', height: '24px',}} icon={faTimes}/>
                        </span>
                    </form>
                </SearchButtonStyledDiv> : null
            }

        </>
    )


};

export default withTranslation(['common'])(SearchButton);

