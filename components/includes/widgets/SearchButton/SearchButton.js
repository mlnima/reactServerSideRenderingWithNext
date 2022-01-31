import React, {useState} from 'react';
import dynamic from "next/dynamic";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";

const SearchButtonForm = dynamic(() => import('./SearchButtonForm'), {ssr: false});

const SearchButtonStyledButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  color: var(--navigation-text-color, #ccc);
`
const SearchButton = () => {
    const {t} = useTranslation('common');
    const [open, setOpen] = useState(false);
    const onOpenHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <>
            <SearchButtonStyledButton onClick={onOpenHandler}
                                      aria-label={'Center Align'}
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
            </SearchButtonStyledButton>
            {open ? <SearchButtonForm open={open} onOpenHandler={onOpenHandler}/> : null}
        </>
    )


};

export default SearchButton;

