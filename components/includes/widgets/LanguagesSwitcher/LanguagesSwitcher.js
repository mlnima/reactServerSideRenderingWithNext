import React, {useContext} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const onChangeHandler = e => {
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: e.target.value
        })
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
