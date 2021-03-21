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
        // router.locale = e.target.value
        // router.defaultLocale  = process.env.REACT_APP_DEFAULT_LOCAL
        //console.log(process.env.REACT_APP_DEFAULT_LOCAL)
       // Cookies.set("NEXT_LOCALE", e.target.value === 'default' ? process.env.REACT_APP_DEFAULT_LOCAL : e.target.value );
        console.log(router)
        //router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: e.target.value === 'default' ? false : e.target.value})
       //router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale: e.target.value === 'default' ? process.env.REACT_APP_DEFAULT_LOCAL : e.target.value})

        if (e.target.value === 'default'){
            router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale:process.env.REACT_APP_DEFAULT_LOCAL})
        }else {
            router.replace({pathname: router.pathname, query: router.query}, router.asPath, {locale:e.target.value})
        }

    }

    return (
        <div className='language-switcher-widget'>
            {(props.translations?.[contextData.state.activeLanguage]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown)?
             <p>{props.translations?.[contextData.state.activeLanguage]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown}</p>:
                null
            }

            <select value={ contextData.state.activeLanguage } aria-label='Center Align'
                onChange={e => onChangeHandler(e)} >
                <option key='default' value='default'>{process.env.REACT_APP_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default LanguagesSwitcher;

//aria-checked='true'

//  <p>{props.translations?.[contextData.state.activeLanguage]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown}</p>