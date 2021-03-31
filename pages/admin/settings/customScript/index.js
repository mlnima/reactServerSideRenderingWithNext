import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { DelayInput } from 'react-delay-input';
import { AppContext } from '../../../../context/AppContext'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { getAbsolutePath } from '../../../../_variables/_variables'
import { getSetting } from '../../../../_variables/ajaxVariables'
import settings from '../general'

const customScript = props => {
    const contextData = useContext(AppContext);

    const [ newScript, setNewScript ] = useState({
        scriptName: '',
        scriptBody: ''
    })
    const [ scriptsName, setScriptsName ] = useState([]);

    useEffect(() => {
        setScriptsName((contextData.siteIdentity.customScripts || []).map(script => script.scriptName))
    }, [ contextData.siteIdentity.customScripts ]);

    const onNewScriptChangeHandler = e => {
        setNewScript({
            ...newScript,
            [e.target.name]: e.target.value
        })
    }

    const onAddHandler = async e => {
        e.preventDefault()
        if (scriptsName.includes(newScript.scriptName)) {
            contextData.dispatchAlert({
                active: true,
                alertMessage: 'already there is script with this name',
                type: 'error'
            })
        } else {
            contextData.dispatchSiteIdentity({
                ...contextData.siteIdentity,
                customScripts: [ ...contextData.siteIdentity.customScripts, newScript ]
            })
        }
    }

    const onDeleteHandler = (scriptName) => {
        contextData.dispatchSiteIdentity({
            ...contextData.siteIdentity,
            customScripts: contextData.siteIdentity.customScripts.filter(script => script.scriptName !== scriptName)
        })
    }

    const onSaveHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        contextData.functions.updateSetting('identity', contextData.siteIdentity).then(() => {
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

    const onGoogleAnalyticsSaveHandler = e => {
        contextData.dispatchSiteIdentity({
            ...contextData.siteIdentity,
            googleAnalyticsID: e.target.value
        })
    }

    const renderScripts = (contextData.siteIdentity.customScripts || []).map(script => {

        const onChangeHandler = e => {

            contextData.dispatchState({
                ...contextData.state,
                loading: true
            })

            const scriptIndex = contextData.siteIdentity.customScripts.findIndex(addedScript => addedScript.scriptName === script.scriptName)

            const updatedScript = {
                ...contextData.siteIdentity.customScripts[scriptIndex],
                [e.target.name]: e.target.value
            }
            setTimeout(() => {



                const updatedScripts = [
                    ...contextData.siteIdentity.customScripts.slice(0, scriptIndex),
                    updatedScript,
                    ...contextData.siteIdentity.customScripts.slice(scriptIndex + 1),
                ];

                contextData.dispatchSiteIdentity({
                    ...contextData.siteIdentity,
                    customScripts: updatedScripts
                })
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })

            }, 500)

        }

        return (
            <div key={script.scriptName} className='customScriptPageItem'>
                <div className='customScriptPageItemHead'>
                    <DelayInput className='customScriptPageItemHeadName' name='scriptName' value={ script.scriptName } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    <button className='removeScript' onClick={ () => onDeleteHandler(script.scriptName) }>X</button>
                </div>
                <DelayInput element="textarea" className='customScript' name='scriptBody' value={ script.scriptBody } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>

            </div>
        )
    })

    const onCustomScriptsAsStringChangeHandler = value =>{
        contextData.dispatchSiteIdentity({
            ...contextData.siteIdentity,
            customScriptsAsString: value
        })
    }
    return (
        <>
            <div className='customScriptsAsStringSection'>
                <Editor
                    language='html'
                    name='customScriptsAsString'
                    theme="vs-dark"
                    value={contextData.siteIdentity.customScriptsAsString || ''}
                    onChange={onCustomScriptsAsStringChangeHandler}
                    classname='customScriptsAsString'
                    width={props.width || '100%'}
                    height={props.height || '70vh'}
                />
                {/*<textarea name='customScriptsAsString' value={contextData.siteIdentity.customScriptsAsString} className='customScriptsAsString' placeholder='Custom Scripts As String' onChange={ e => onCustomScriptsAsStringChangeHandler(e) }/>*/}
                <button className='saveBtn' onClick={ () => onSaveHandler() }>Save</button>
            </div>

            <form className='addCustomScriptForm' onSubmit={ e => onAddHandler(e) }>
                <input className='scriptName' name='scriptName' placeholder='Script Name' onChange={ e => onNewScriptChangeHandler(e) }/>
                <textarea name='scriptBody' className='addScriptTextarea' placeholder='Script with out Script Tag' onChange={ e => onNewScriptChangeHandler(e) }/>
                <button type='submit'>Add</button>
            </form>
            <div className='customScripts'>
                { renderScripts }
            </div>
            <button className='saveBtn' onClick={ () => onSaveHandler() }>Save</button>
        </>
    );
};

export default customScript;
