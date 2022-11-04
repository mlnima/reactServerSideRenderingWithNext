import React, { useState, MouseEvent, useEffect} from "react";
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";

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
    animation: ${(props: { open: boolean }) => props.open ? `searchbarFall .3s linear alternate` : `none`};
    justify-content: center;
    position: fixed;
    top: 1px;
    left: 0;
    right: 0;
    width: 100%;
    background: var(--serachbar-widget-background, #252525);

    .search-button-widget-close-btn, .searchbar-submit-btn, .search-button-widget-clear-keyword {
      background: var(--serachbar-widget-buttons-background, #252525);
      color: var(--serachbar-widget-text-color, #fff);
      border: none;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 9px;
    }

    .searchbar-input {
      background: var(--serachbar-widget-input-background, #252525);
      border: none;
      outline: none;
      color: var(--serachbar-widget-text-color, #fff);
    }

    .search-button-widget-clear-keyword {
      display: none;
    }
  }

  @media only screen and (min-width: 768px) {
    width: clamp(300px, 400px, 650px);;
    .open-close-search-form {
      display: none;
    }

    .searchbar-form {
      display: flex;
      position: initial;

      .searchbar-submit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
      }

      .search-button-widget-close-btn {
        display: none;
      }

      .search-button-widget-clear-keyword {
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }
  }

`

const Searchbar = () => {

    const {t} = useTranslation();

    const {push, query} = useRouter()
    const [keyword, setKeyword] = useState('')
    const [open, setOpen] = useState(null)

    useEffect(() => {
        if (query?.keyword && query?.keyword !== keyword) {
            setKeyword(query?.keyword as string)
        }
    }, [query?.keyword]);


    const onSearchHandler = (e) => {
        e.preventDefault()
        if (keyword?.length >= 2) {
            push({
                pathname: `/search/${keyword}`,
                query: {
                    page: 1
                }
            }).finally()
        }
        if (!keyword?.length) {
            push({
                pathname: `/`,
            }).finally()
        }
    }

    const onClearHandler = (e: MouseEvent) => {
        e.preventDefault()
        setKeyword('')
    }

    const onCloseForm = (e: MouseEvent) => {
        e.preventDefault()
        if (keyword.length) {
            setKeyword('')
        } else {
            setOpen(!open)
        }
    }




    return (
        <SearchbarStyledDiv className={'searchbar'} open={open}>

            <button onClick={() => setOpen(!open)}
                    aria-label={'open close search form'}
                    title={t('common:Search',{},{fallback:'Search'})}
                    className={'open-close-search-form'}>

                <SvgRenderer svgUrl={'/asset/images/icons/magnifying-glass-solid.svg'}
                             size={25}
                             color={'var(--serachbar-widget-text-color, #fff)'}/>

            </button>

            <form className={'searchbar-form'} onSubmit={e => onSearchHandler(e)}>

                <span className='btn search-button-widget-close-btn'
                        title={t('common:Close',{},{fallback:'Close'})}
                        onClick={e => onCloseForm(e)}>
                    <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                                 size={25}
                                 customClassName={'search-button-widget-close-btn-icon'}
                                 color={'var(--serachbar-widget-text-color, #fff)'}/>
                </span>

                {!!keyword?.length &&
                <span className='btn search-button-widget-clear-keyword'
                        title={t('common:Clear',{},{fallback:'Clear'})}
                        onClick={e => onClearHandler(e)}>
                    <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                                 size={25}
                                 customClassName={'search-button-widget-clear-keyword-icon'}
                                 color={'var(--serachbar-widget-text-color, #fff)'}/>
                </span>}
                <input type="text"
                       onChange={e => setKeyword(e.target.value)}
                       name='keyword' value={keyword || ''}
                       className='searchbar-input form-control-input'
                       placeholder={t('common:Search...',{},{fallback:'Search...'})}
                />
                <button type='submit'
                        className='btn searchbar-submit-btn'
                        title={t('common:Search',{},{fallback:'Search'})}
                >
                    <SvgRenderer svgUrl={'/asset/images/icons/magnifying-glass-solid.svg'}
                                 size={25}
                                 customClassName={'searchbar-submit-btn-icon'}
                                 color={'var(--serachbar-widget-text-color, #fff)'}/>
                </button>

            </form>

        </SearchbarStyledDiv>
    )
};
export default Searchbar;