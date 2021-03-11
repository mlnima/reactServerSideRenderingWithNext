import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {convertVariableNameToName, languagesOptions} from '../../../../_variables/_variables';

const EcommerceSettingsInputSection = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        activeEditingLanguage: 'default',
        translations: {}
    });
    const onChangeLanguageHandler = e => {
        setState({
            ...state,
            activeEditingLanguage: e.target.value
        })
    }
    const onSaveHandler = () => {
        contextData.functions.updateSetting('eCommerce', contextData.eCommerceSettings).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }).catch(err => {
            console.log(err)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }

    const onChangeHandler = e => {
        if (state.activeEditingLanguage === 'default') {
            contextData.dispatchECommerceSettings({
                ...contextData.eCommerceSettings,
                [e.target.name]: e.target.value
            })
        } else {
            contextData.dispatchECommerceSettings({
                ...contextData.eCommerceSettings,
                translations:{
                    ...contextData.eCommerceSettings.translations,
                    [state.activeEditingLanguage]:{
                        ...contextData.eCommerceSettings.translations[state.activeEditingLanguage] ?? {},
                            [e.target.name]: e.target.value
                    }
                }
            })
        }
    }

    return (
        <div className='e-commerce-settings-input-section'>
            <h3 className='e-commerce-settings-input-section-title e-commerce-settings-input-section-sub'>{convertVariableNameToName(props.name)}</h3>
            {props.translation ?
            <select className='e-commerce-settings-input-section-select e-commerce-settings-input-section-sub' name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
                {languagesOptions}
            </select>
            : null
        }

            <input className='e-commerce-settings-input-section-input e-commerce-settings-input-section-sub' name={props.name} value={
                state.activeEditingLanguage === 'default' ? contextData.eCommerceSettings[props.name] ?? '' :
                contextData.eCommerceSettings.translations?.[state.activeEditingLanguage]?.[props.name] ?? ''
            } onChange={e => onChangeHandler(e)}/>
            <button className='e-commerce-settings-input-section-save-button e-commerce-settings-input-section-sub' onClick={onSaveHandler}>save</button>
        </div>

    );
};
export default EcommerceSettingsInputSection;
