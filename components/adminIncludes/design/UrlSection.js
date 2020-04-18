import React, { useEffect, useState, useContext, useRef } from 'react';
import { convertVariableNameToName } from '../../../_variables/_variables'
import { AppContext } from '../../../context/AppContext'
import { DelayInput } from 'react-delay-input';
import SaveDesignChangesBtn from './SaveDesignChangesBtn'

const UrlSection = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='url-setting-Section'>
            <div>
                <p>{props.designName?convertVariableNameToName(props.designName):''} : </p>
                <DelayInput className='admin-input' name={ props.designName } value={contextData.siteDesign[props.designName]} onChange={ e => onChangeHandler(e) }/>
            </div>
            <SaveDesignChangesBtn/>
        </div>
    );
};
export default UrlSection;
