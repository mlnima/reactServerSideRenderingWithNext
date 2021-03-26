import React, {useEffect, useState, useContext, useRef} from 'react';
import {languagesOptions} from "../../../../../_variables/_variables";

const SearchTypeInputFields = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);



    const mobileModeChangeHandler = element=>{
        const e= {
            target:{
                name:'mobileMode',
                value:element.target.checked
            }
        }
        props.onChangeHandler(e)
        console.log(element.target.checked)
    }
    return (
         <>
             <div className='textInputFieldForWidget widgetSection'>
                 <p>Search Input Place Holder</p>
                 <input  className='searchInputPlaceHolder' name='searchInputPlaceHolder' placeholder='Search Input PlaceHolder'
                         value={
                             props.widgetSettings.activeEditingLanguage === 'default' ?
                                 props.widgetData.searchInputPlaceHolder :
                                 props.widgetData.translations ?
                                     props.widgetData.translations[props.widgetSettings.activeEditingLanguage] ?
                                         props.widgetData.translations[props.widgetSettings.activeEditingLanguage].searchInputPlaceHolder || '' :
                                         '' : ''
                         }
                         onChange={e => props.onTextInputsDataChangeHandler(e)}/>
             </div>
             <div className='selectInputFieldForWidget widgetSection'>
                 <p>Mobile Mode:</p>
                 {/*<select name='mobileMode' value={props.widgetData.mobileMode} onChange={e => props.onChangeHandler(e)}>*/}
                 {/*    <option value='true'>True</option>*/}
                 {/*    <option value='false'>False</option>*/}
                 {/*</select>*/}
                 <input type='checkbox' name='mobileMode' value={props.widgetData.mobileMode} onChange={e=>mobileModeChangeHandler(e)}/>
             </div>
          </>
    );
};
export default SearchTypeInputFields;
