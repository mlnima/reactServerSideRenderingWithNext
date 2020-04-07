import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { DelayInput } from 'react-delay-input';
import './customScript.scss';
import { AppContext } from '../../../../context/AppContext'
import { getAbsolutePath } from '../../../../_variables/_variables'
import { getSetting } from '../../../../_variables/ajaxVariables'
import settings from '../general'

const customScript = props => {
    const contextData = useContext(AppContext);

    const onChangeHandler = e => {
        contextData.dispatchSiteIdentity({
            ...contextData.siteIdentity,
            customScript: e.target.value
        })
    }

    const onSaveHandler = ()=>{

        contextData.functions.updateSetting('identity', contextData.siteIdentity).then(()=>{
            contextData.dispatchState({
                ...contextData.state,
                loading:false
            })
        })
    }
    // useEffect(() => {
    //     console.log(contextData.siteIdentity )
    // }, [contextData.siteIdentity]);

    return (
        <AdminLayout>
            <div className='customScriptPage'>
                <DelayInput element="textarea" className='customScript' name='videoEmbedCode' value={ contextData.siteIdentity.customScript } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                <button onClick={()=>onSaveHandler()}>Save</button>
            </div>
        </AdminLayout>
    );
};

export default customScript;
