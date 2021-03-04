import React, {useContext} from 'react';
import {AppContext} from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router';
import {useRouter} from "next/router";
import {languagesOptions} from "../../../../_variables/_variables";

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    // const languagesOptions = (process.env.REACT_APP_LOCALS.split(' ').filter(lang=>lang!== process.env.REACT_APP_DEFAULT_LOCAL) || []).map(lang => {
    //     return (
    //         <option key={lang} value={lang}>{lang}</option>
    //     )
    // })

    const onChangeHandler = e => {
        e.target.value === 'default' ?
            localStorage.removeItem('lang'):
            localStorage.setItem('lang', e.target.value);
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: e.target.value
        })
     router.replace({pathname: router.pathname, query: router.query}, router.asPath,{locale: e.target.value === 'default' ?  null :e.target.value} )
    }

    return (
        <div className='language-switcher-widget'>
            <p>{props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].languageToShowBesideDropDown || props.languageToShowBesideDropDown : props.languageToShowBesideDropDown : props.languageToShowBesideDropDown}</p>
            <select value={typeof localStorage !== undefined ? localStorage.lang:undefined ||router.locale||'default'} onChange={e => onChangeHandler(e)} aria-checked='true'>
                <option key='default' value='default'>{process.env.REACT_APP_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default withRouter(LanguagesSwitcher);
