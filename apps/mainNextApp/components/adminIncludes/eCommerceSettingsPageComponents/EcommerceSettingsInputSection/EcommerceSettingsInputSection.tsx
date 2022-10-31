import React from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import {useAdminDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "typescript-types";
// import {convertVariableNameToName, languagesOptions} from '../../../../custom-client-variables/custom-client-variables';
// import {updateSetting} from "../../../../store/clientActions/settingsActions";
// import {setLoading} from "../../../../store/clientActions/globalStateActions";
let StyledDiv = styled.div`
  background-color: #222;
  width: 300px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 5px;
  .e-commerce-settings-input-section-description{
    color: white;
  }
  .e-commerce-settings-input-section-sub{
    margin: 5px;
  }
  .e-commerce-settings-input-section-title{
     color: white;
  }

  .e-commerce-settings-input-section-select{

  }

  .e-commerce-settings-input-section-input{
    width: 95%;
  }
  .e-commerce-settings-input-section-save-button{

  }
`
const EcommerceSettingsInputSection = props => {
    const dispatch = useAdminDispatch()
    const eCommerce = useSelector((store:Store) => store?.settings?.eCommerce)
    //eCommerce
    // const contextData = useContext(AppContext);
    // const [state, setState] = useState({
    //     activeEditingLanguage: 'default',
    //     translations: {}
    // });
    // const onChangeLanguageHandler = e => {
    //     setState({
    //         ...state,
    //         activeEditingLanguage: e.target.value
    //     })
    // }
    // const onSaveHandler = () => {
    //     dispatch(setLoading(true))
    //     dispatch(updateSetting('eCommerce', eCommerce))
    //
    // }



    // const onChangeHandler = e => {
    //     if (state.activeEditingLanguage === 'default') {
    //         contextData.dispatchECommerceSettings({
    //             ...contextData.eCommerceSettings,
    //             [e.target.name]: e.target.value
    //         })
    //     } else {
    //         contextData.dispatchECommerceSettings({
    //             ...contextData.eCommerceSettings,
    //             translations: {
    //                 ...contextData.eCommerceSettings.translations,
    //                 [state.activeEditingLanguage]: {
    //                     ...contextData.eCommerceSettings.translations[state.activeEditingLanguage] ?? {},
    //                     [e.target.name]: e.target.value
    //                 }
    //             }
    //         })
    //     }
    // }

    // return (
    //     <StyledDiv className='e-commerce-settings-input-section'>
    //         <h3 style={{
    //             color: props.fieldRequired ? contextData.eCommerceSettings[props.name] ? '#00ff59' : 'red' : 'white',
    //         }} className='e-commerce-settings-input-section-title e-commerce-settings-input-section-sub'>{convertVariableNameToName(props.name)}</h3>
    //         <p className='e-commerce-settings-input-section-description e-commerce-settings-input-section-sub'>{props.description}</p>
    //         {props.translation ?
    //             <select className='e-commerce-settings-input-section-select e-commerce-settings-input-section-sub' name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
    //                 <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?? 'default'}</option>
    //                 {languagesOptions}
    //             </select>
    //             : null
    //         }
    //
    //         <input type={props.inputType ?? 'text'} className='e-commerce-settings-input-section-input e-commerce-settings-input-section-sub' name={props.name} value={
    //             state.activeEditingLanguage === 'default' ? contextData.eCommerceSettings[props.name] ?? '' :
    //                 contextData.eCommerceSettings.translations?.[state.activeEditingLanguage]?.[props.name] ?? ''
    //         }
    //                onChange={e => onChangeHandler(e)}
    //         />
    //         <button className='e-commerce-settings-input-section-save-button e-commerce-settings-input-section-sub' onClick={onSaveHandler}>save</button>
    //     </StyledDiv>
    //
    // );
    return null
};
export default EcommerceSettingsInputSection;
