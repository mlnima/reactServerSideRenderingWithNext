import React, {FC, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const SearchbarStyledDiv = styled.div`
  position: relative;
  z-index: 11;
  .open-close-search-form {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    outline: none;
    color: var(--navigation-text-color, #ccc);
  }

  .searchbar-form {
    display: ${({open}: { open: boolean }) => open ? 'flex' : 'none'};
    animation:${(props: { open: boolean }) => props.open ? `searchbarFall .3s linear alternate` : `none`};
    justify-content: center;
    position: fixed;
    top: 1px;
    left: 0;
    right: 0;
    width: 100%;
    background: var(--serachbar-widget-background, #252525);
    .search-button-widget-close-btn ,.searchbar-submit-btn,.search-button-widget-clear-keyword{
      background: var(--serachbar-widget-buttons-background, #252525);
      color: var(--serachbar-widget-text-color, #fff);
      border: none;
      outline: none;
      width: 42px;
      height: 42px;
      margin: 0;
      padding: 9px;
    }
    .searchbar-input{
      background: var(--serachbar-widget-input-background, #252525);
      border: none;
      outline: none;
      color: var(--serachbar-widget-text-color, #fff);
    }
    .search-button-widget-clear-keyword{
      display: none;
    }
  }

  @media only screen and (min-width: 768px) {
    width: clamp(300px, 100%, 650px);;
    .open-close-search-form{
      display: none;
    }
    .searchbar-form{
      display:flex;
      position: initial;
      .search-button-widget-close-btn{
        display: none;
      }
      .search-button-widget-clear-keyword{
        display: initial;
      }
    }
  }
  
`

interface SearchbarPropTypes {
}

const Searchbar: FC<SearchbarPropTypes> = (props) => {

    const {t} = useTranslation('common');
    const {push} = useRouter()
    const [keyword, setKeyword] = useState(null)
    const [open, setOpen] = useState(null)

    const onSearchHandler = e => {
        e.preventDefault()
        if (keyword?.length > 2) {
            push({
                pathname: `/search/${keyword}`,
                query: {
                    page: 1
                }
            }).finally()
        }
    }

    const SearchSVG = () => {
        return <svg xmlns="http://www.w3.org/2000/svg"
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
    }

    return (
        <SearchbarStyledDiv className={'searchbar'} open={open}>
            <button onClick={() => setOpen(!open)}
                    aria-label={'open close search form'}
                    title={t<string>('Search')}
                    className={'open-close-search-form'}
            >
                <SearchSVG/>
            </button>

            <form className={'searchbar-form'} onSubmit={e => onSearchHandler(e)}>
                <button className='btn search-button-widget-close-btn' title={t<string>('Close')}>
                    <FontAwesomeIcon onClick={() => setOpen(!open)}
                        style={{width: '24px', height: '24px',}}
                        icon={faTimes}
                    />
                </button>
                <button className='btn search-button-widget-clear-keyword' title={t<string>('Clear')}>
                    <FontAwesomeIcon onClick={() => setKeyword('')}
                        style={{width: '24px', height: '24px',}}
                        icon={faTimes}
                    />
                </button>
                <input type="text"
                       onChange={e => setKeyword(e.target.value)}
                       name='keyword' value={keyword || ''}
                       className='searchbar-input form-control-input'
                       placeholder={t<string>('Search...')}
                />
                <button type='submit'
                        //className='search-button-widget-form-submit-btn'
                        className='btn searchbar-submit-btn'
                        title={t<string>('Search')}
                >
                    <SearchSVG/>
                </button>

            </form>

        </SearchbarStyledDiv>
    )
};
export default Searchbar
