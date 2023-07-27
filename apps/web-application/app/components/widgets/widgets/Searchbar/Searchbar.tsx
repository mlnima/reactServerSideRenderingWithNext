'use client';
//@ts-ignore
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useTranslation from 'next-translate/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";

const SearchBar: React.FC = () => {
    const { t } = useTranslation('common');
    const { push } = useRouter();
    const [keyword, setKeyword] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    // useEffect(() => {
        // const updatedKeyword = query.keyword as string;
        // if (updatedKeyword) {
        //     setKeyword(updatedKeyword);
        // }
    // }, [asPath]);

    const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (keyword && keyword.length >= 2) {
            push(`/search/${keyword}?page=1`);
        } else {
            push('/');
        }
    };

    const onClearHandler = () => {
        setKeyword('');
    };

    return (
        <div className="relative z-10">
            <button
                onClick={() => setOpen(!open)}
                aria-label={t('openCloseSearchForm')}
                title={t('search', {}, { fallback: 'Search' })}
                className="flex items-center justify-center w-6 h-6 bg-transparent text-[var(--primary-text-color,#fff)] border-none outline-none"
            >
                <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>

            {open && (
                <form
                    onSubmit={onSearchHandler}
                    className="flex items-center fixed top-1 left-0 right-0 w-full p-2 bg-[var(--primary-background-color,#000)] transition-transform duration-300 ease-in-out"
                >
                    <button
                        onClick={() => setOpen(false)}
                        title={t('close', {}, { fallback: 'Close' })}
                        className="flex items-center justify-center w-6 h-6 mr-2 bg-transparent text-[var(--primary-text-color,#fff)] border-none outline-none"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword || ''}
                        className="flex-grow px-2 py-1 mr-2 bg-[var(--primary-background-color,#000)] text-[var(--primary-text-color,#fff)] border-none outline-none"
                        placeholder={t('search...', {}, { fallback: 'Search...' })}
                    />

                    {!!keyword?.length && (
                        <button
                            onClick={onClearHandler}
                            title={t('clear', {}, { fallback: 'Clear' })}
                            className="flex items-center justify-center w-6 h-6 mr-2 bg-transparent text-[var(--primary-text-color,#fff)] border-none outline-none"
                        >
                            <FontAwesomeIcon icon={faEraser} className="w-5 h-5" />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-6 h-6 bg-transparent text-[var(--primary-text-color,#fff)] border-none outline-none"
                    >
                        <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                    </button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;




























// import React, {useState, MouseEvent, useEffect} from "react";
// import styled from "styled-components";
// import useTranslation from 'next-translate/useTranslation'
// import {usePathname, useRouter, useSearchParams} from 'next/navigation';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
// import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
//
// const SearchbarStyledDiv = styled.div`
//   position: relative;
//   z-index: 11;
//
//   .open-close-search-form {
//     border: none;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: transparent;
//     outline: none;
//     color: var(--primary-text-color,#fff);
//   }
//
//   .searchbar-form {
//     display: ${({open}: { open: boolean }) => open ? 'flex' : 'none'};
//     animation: ${(props: { open: boolean }) => props.open ? `searchbarFall .3s linear alternate` : `none`};
//     justify-content: center;
//     position: fixed;
//     top: 1px;
//     left: 0;
//     right: 0;
//     width: 100%;
//     background: var(--primary-background-color,#000);
//
//     .search-button-widget-close-btn, .searchbar-submit-btn, .search-button-widget-clear-keyword {
//       background: var(--primary-background-color,#000);
//       color: var(--primary-text-color, #fff);
//       border: none;
//       outline: none;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0;
//       padding: 9px;
//     }
//
//     .searchbar-input {
//       background: var(--primary-background-color,#000);
//       border: none;
//       outline: none;
//       color: var(--primary-text-color,#fff);
//     }
//
//     .search-button-widget-clear-keyword {
//       display: none;
//     }
//   }
//
//   @media only screen and (min-width: 768px) {
//     border: var(--default-border);
//     width: clamp(300px, 400px, 650px);;
//     .open-close-search-form {
//       display: none;
//     }
//
//     .searchbar-form {
//       display: flex;
//       position: initial;
//
//       .searchbar-submit-btn {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         right: 0;
//       }
//
//       .search-button-widget-close-btn {
//         display: none;
//       }
//
//       .search-button-widget-clear-keyword {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }
//
//     }
//   }
//
// `
//
// const Searchbar = () => {
//
//     const {t} = useTranslation('common');
//     const {push} = useRouter()
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//
//     const [keyword, setKeyword] = useState<string | null>(searchParams.get('keyword') ? searchParams.get('keyword') : null)
//     const [open, setOpen] = useState<boolean>(true)
//
//     useEffect(() => {
//         const keyword = searchParams.get('keyword');
//         if (keyword && keyword !== keyword) {
//             setKeyword(keyword)
//         }
//     }, [pathname]);
//
//
//     const onSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         if (!keyword?.length) {
//             push(`/`)
//         }
//         if (!!keyword && keyword?.length >= 2) {
//             push(`/search/${keyword}?page=1`)
//         }
//     }
//
//     const onClearHandler = (e: MouseEvent) => {
//         e.preventDefault()
//         setKeyword('')
//     }
//
//     const onCloseForm = (e: MouseEvent) => {
//         e.preventDefault()
//         if (!!keyword && keyword?.length) {
//             setKeyword('')
//         } else {
//             setOpen(!open)
//         }
//     }
//
//     return (
//         <SearchbarStyledDiv className={'searchbar'} open={open}>
//
//             <button onClick={() => setOpen(!open)}
//                     aria-label={'open close search form'}
//                     title={t('common:Search', {}, {fallback: 'Search'})}
//                     className={'open-close-search-form'}>
//
//                 <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 25, height: 25}}/>
//             </button>
//
//             <form className={'searchbar-form'} onSubmit={e => onSearchHandler(e)}>
//
//                 <span className='btn search-button-widget-close-btn'
//                       title={t('common:Close', {}, {fallback: 'Close'})}
//                       onClick={e => onCloseForm(e)}>
//                      <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
//                 </span>
//
//                 {!!keyword?.length &&
//                     <span className='btn search-button-widget-clear-keyword'
//                           title={t('common:Clear', {}, {fallback: 'Clear'})}
//                           onClick={e => onClearHandler(e)}>
//                      <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}}/>
//                 </span>}
//                 <input type="text"
//                        onChange={e => setKeyword(e.target.value)}
//                        name='keyword' value={keyword || ''}
//                        className='searchbar-input form-control-input'
//                        placeholder={t('common:Search...', {}, {fallback: 'Search...'})}
//                 />
//                 <button type='submit'
//                         className='btn searchbar-submit-btn'
//                         title={t('common:Search', {}, {fallback: 'Search'})}>
//                     <FontAwesomeIcon icon={faMagnifyingGlass} style={{width: 25, height: 25}}/>
//                 </button>
//
//             </form>
//
//         </SearchbarStyledDiv>
//     )
// };
// export default Searchbar;
