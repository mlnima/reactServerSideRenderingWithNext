import React, {useState} from 'react';
import dynamic from "next/dynamic";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";
import {updateSetting} from "../../../../store/actions/settingsActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const customScript = (props: { width: any; height: any; }) => {
    const dispatch = useDispatch()
    const identity = useSelector((state: StoreTypes) => state.settings.identity)

    const [customScriptsAsString, setCustomScriptsAsString] = useState(() => identity.customScriptsAsString)

    const onSaveHandler = () => {
        dispatch(setLoading(true))
        dispatch(updateSetting('identity', {
            ...identity,
            customScriptsAsString
        }))
    }

    const onCustomScriptsAsStringChangeHandler = (value: any) => {
        setCustomScriptsAsString(value)
    }


    return (
        <div>
            <div className='customScriptsAsStringSection'>
                <Editor
                    language='html'
                    // @ts-ignore
                    name='customScriptsAsString'
                    theme="vs-dark"
                    value={customScriptsAsString || ''}
                    onChange={onCustomScriptsAsStringChangeHandler}
                    classname='customScriptsAsString'
                    width={props.width || '100%'}
                    height={props.height || '70vh'}
                />
                <button className='saveBtn green-action-btn-link' onClick={() => onSaveHandler()}>Save</button>
            </div>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default customScript;
