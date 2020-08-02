import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router';
import LanguageSolidSVG from '../../../../static/images/fontawesome/language-solid.svg'

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const languagesOptions = (contextData.siteIdentity.translationLanguages || []).map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })

    const onChangeHandler = e => {
        localStorage.setItem('lang', e.target.value)
        contextData.dispatchState({
            ...contextData.state,
            activeLanguage: e.target.value
        })
    }


    return (
        <div className='language-switcher-widget'>
            <p>{props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].languageToShowBesideDropDown || props.languageToShowBesideDropDown : props.languageToShowBesideDropDown : props.languageToShowBesideDropDown}</p>
            <select value={contextData.state.activeLanguage} onChange={e => onChangeHandler(e)}>
                <option key='default' value='default'>{props.languageTextAsDefaultLanguage ||'default'}</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default withRouter(LanguagesSwitcher);
