import React, {useContext} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";
import Cookies from "js-cookie";

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const onChangeHandler = e => {
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: e.target.value
        })
        Cookies.set("NEXT_LOCALE", e.target.value === 'default' ? process.env.REACT_APP_DEFAULT_LOCAL : e.target.value );
      //  router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: e.target.value === 'default' ? false : e.target.value})
        router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: e.target.value === 'default' ? process.env.REACT_APP_DEFAULT_LOCAL : e.target.value})
    }

    return (
        <div className='language-switcher-widget'>
            <p>{props.translations?.[contextData.state.activeLanguage]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown}</p>
            <select value={ contextData.state.activeLanguage } aria-label='Center Align'
                onChange={e => onChangeHandler(e)} aria-checked='true'>
                <option key='default' value='default'>{process.env.REACT_APP_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default LanguagesSwitcher;
