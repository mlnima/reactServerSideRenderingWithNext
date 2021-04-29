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
            <style jsx>{`
.language-switcher-widget{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.language-switcher-widget-text{
    margin: 0 20px 5px 0;
    color: var(--navigation-text-color);
}
select{
  border: none;
  background-color: var(--navigation-background-color);
  color: var(--navigation-text-color);
}
`}</style>
            {(props.translations?.[contextData.state.activeLanguage || router.locale ]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown)?
             <p className='language-switcher-widget-text'>{props.translations?.[contextData.state.activeLanguage || router.locale ]?.languageToShowBesideDropDown ?? props.languageToShowBesideDropDown}</p>:
                null
            }
            <select value={ contextData.state.activeLanguage || router.locale } aria-label='Center Align'
                onChange={e => onChangeHandler(e)} >
                <option key='default' value='default'>{process.env.REACT_APP_DEFAULT_LOCAL || 'default'}</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default LanguagesSwitcher;
