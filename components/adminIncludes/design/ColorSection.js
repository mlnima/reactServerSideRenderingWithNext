import React, { useEffect, useState, useContext, useRef } from 'react';
import { DelayInput } from 'react-delay-input'
import SaveDesignChangesBtn from './SaveDesignChangesBtn'
import { AppContext } from '../../../context/AppContext'
import {convertVariableNameToName} from '../../../_variables/_variables'

const ColorSection = props => {
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
        <div className='colorSettingSection'>
            <p>{convertVariableNameToName(props.designName)} : </p>
            <div>
                <DelayInput className='colorSettingSectionInput' name={props.designName}
                            value={ contextData.siteDesign[props.designName] }
                            delayTimeout={ 1000 }
                            onChange={ e => onChangeHandler(e) }/>
                <div className="previewColor" style={ { backgroundColor: contextData.siteDesign[props.designName] } }/>
            </div>
            <SaveDesignChangesBtn/>
        </div>
    );
};
export default ColorSection;


