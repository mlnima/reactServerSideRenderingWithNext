import React, {useState } from 'react';
import dynamic from "next/dynamic";
const Editor = dynamic(()=>import('@monaco-editor/react'),{ssr:false})
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";
import {updateSetting} from "../../../../store/actions/settingsActions";

const customScript = props => {
    const dispatch = useDispatch()
    const identity = useSelector(state => state.settings.identity)

    const [customScriptsAsString,setCustomScriptsAsString] = useState(()=>identity.customScriptsAsString)

    const onSaveHandler = () => {
        dispatch(setLoading(true))
        dispatch(updateSetting('identity', {
            ...identity,
            customScriptsAsString
        }))
    }

    const onCustomScriptsAsStringChangeHandler = value =>{
        setCustomScriptsAsString(value)
    }

    return (
        <div>
            <div className='customScriptsAsStringSection'>
                <Editor
                    language='html'
                    name='customScriptsAsString'
                    theme="vs-dark"
                    value={customScriptsAsString || ''}
                    onChange={onCustomScriptsAsStringChangeHandler}
                    classname='customScriptsAsString'
                    width={props.width || '100%'}
                    height={props.height || '70vh'}
                />
                <button className='saveBtn green-action-btn-link' onClick={ () => onSaveHandler() }>Save</button>
            </div>
        </div>
    );
};

export default customScript;
