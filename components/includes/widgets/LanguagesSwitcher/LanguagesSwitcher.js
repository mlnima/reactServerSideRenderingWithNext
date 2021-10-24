import React from 'react';
import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons";

const LanguagesSwitcherStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .globe-icon {
    margin: 0 3px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .language-switcher-widget-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 12px;
    color: var(--navigation-text-color, #ccc);
  }

  .custom-select {
    border: none;
    width: 60px;
    background-color: var(--navigation-background-color, #18181b);
    color: var(--navigation-text-color, #ccc);
  }
`
const LanguagesSwitcher = props => {
    const router = useRouter()

    const onChangeHandler = e => {
        if (e.target.value === 'default') {
            router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL})
        } else {
            router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: e.target.value})
        }
    }

    return (
        <LanguagesSwitcherStyledDiv className='language-switcher-widget'>

            <span className='globe-icon'>
                <FontAwesomeIcon icon={faGlobeEurope} className='navigation-dropdown-icon'/>
            </span>

            <select className={'custom-select'} value={router.locale} aria-label='Center Align' onChange={e => onChangeHandler(e)}>
                <option key='default' value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>

        </LanguagesSwitcherStyledDiv>
    );
};
export default withTranslation(['common'])(LanguagesSwitcher);
