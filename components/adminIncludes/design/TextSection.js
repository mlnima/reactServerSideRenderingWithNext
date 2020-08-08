import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import SaveDesignChangesBtn from "./SaveDesignChangesBtn";
import {convertVariableNameToName} from "../../../_variables/_variables";
import {DelayInput} from "react-delay-input";

const TextSection = props => {
    const contextData = useContext(AppContext);

    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className='text-setting-section adminDesignSectionItem'>
            <div>
                <p>{props.designName?convertVariableNameToName(props.designName):''} : </p>
                <DelayInput className='admin-input' name={ props.designName } value={contextData.siteDesign[props.designName]} onChange={ e => onChangeHandler(e) }/>
            </div>
            <SaveDesignChangesBtn/>
        </div>
    );
};
export default TextSection;
