import {useContext} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";
import styled from "styled-components";
import {withTranslation} from "next-i18next";

const LanguagesSwitcherStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .language-switcher-widget-text{
    margin: 0 20px 5px 0;
    font-size: 12px;
    color: var(--navigation-text-color);
  }
  select{
    border: none;
    background-color: var(--navigation-background-color);
    color: var(--navigation-text-color);
  }
  
`

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const onChangeHandler = e => {
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: e.target.value
        })
        if (!props.cookiePage){
            if (e.target.value === 'default'){
                router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale:process.env.REACT_APP_DEFAULT_LOCAL})
            }else {
                router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale:e.target.value})
            }
        }
    }

    return (
        <LanguagesSwitcherStyledDiv className='language-switcher-widget'>

            {(props.translations?.[contextData.state.activeLanguage || router.locale ]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown)?
             <p className='language-switcher-widget-text'>{props.translations?.[contextData.state.activeLanguage || router.locale ]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown}</p>:
                null
            }
            <p className='language-switcher-widget-text'>{props.t(`common:Language`)}</p>
            <select value={ contextData.state.activeLanguage || router.locale } aria-label='Center Align'
                onChange={e => onChangeHandler(e)} >
                <option key='default' value='default'>{process.env.REACT_APP_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>
        </LanguagesSwitcherStyledDiv>
    );
};
export default withTranslation(['common'])(LanguagesSwitcher);
