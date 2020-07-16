import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router'

const LanguagesSwitcher = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        activeLang : 'en'
    });

    useEffect(() => {
        if (props.router){
            if (props.router.query.lang){
                setState({
                    ...state,
                    activeLang: props.router.query.lang
                })
            }
        }


    }, []);

    const languagesOptions = (contextData.siteIdentity.translationLanguages || []).map(lang => {
        return (
            <>
                <option value={lang}>{lang}</option>
            </>
        )
    })

    const onChangeHandler = e=>{
     if (e.target.value && props.router){
          if (e.target.value === 'en'){
              let query = props.router ? { ...props.router.query, lang: e.target.value } : ''
               delete query.lang

              const path = {
                  pathname: props.router ? props.router.pathname : '',
                  query
              }
              localStorage.lang?localStorage.removeItem('lang'): null
              props.router.push(path)
          }else{
              const path = {
                  pathname: props.router ? props.router.pathname : '',
                  query: props.router ? { ...props.router.query, lang: e.target.value } : ''
              }
              localStorage.setItem('lang',e.target.value)
              props.router.push(path)
          }
        }
    }

    return (
        <div className='language-switcher-widget'>
            <select value={state.activeLang} onChange={e=>onChangeHandler(e)}>
                <option value='en'>en</option>
                {languagesOptions}
            </select>
        </div>
    );
};
export default withRouter(LanguagesSwitcher);
