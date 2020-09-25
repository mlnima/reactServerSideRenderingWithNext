import React, {useEffect, useState, useContext, useRef} from 'react';
import {DelayInput} from 'react-delay-input'
import SaveDesignChangesBtn from './SaveDesignChangesBtn'
import {AppContext} from '../../../context/AppContext'
import {convertVariableNameToName} from '../../../_variables/_variables'

const ColorSection = props => {
    const contextData = useContext(AppContext);
    const inputColorElement = useRef(null)


    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className='colorSettingSection'>
            <p>{props.designName ? convertVariableNameToName(props.designName) : ''} : </p>

            <DelayInput className='colorSettingSectionInput' name={props.designName}
                        value={contextData.siteDesign[props.designName]}
                        delayTimeout={1000}
                        onChange={e => onChangeHandler(e)}/>
            <input ref={inputColorElement}  className='colorSettingSectionInputColorType' type='color' name={props.designName} onChange={e => onChangeHandler(e)} value={contextData.siteDesign[props.designName]}/>
            <div onClick={()=>inputColorElement.current.click()} className="previewColor" style={{backgroundColor: contextData.siteDesign[props.designName]}}/>

            <SaveDesignChangesBtn/>
        </div>
    );
};
export default ColorSection;


