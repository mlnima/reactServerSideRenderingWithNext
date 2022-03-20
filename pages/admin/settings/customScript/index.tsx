import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
import {useDispatch, useSelector} from "react-redux";
import {updateSetting} from "@store/clientActions/settingsActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";

const customScript = (props: { width: any; height: any; }) => {
    const dispatch = useDispatch()
    const identity = useSelector((store: StoreTypes) => store.settings.identity)
    const [customScriptsAsString, setCustomScriptsAsString] = useState('')

    useEffect(() => {
        setCustomScriptsAsString(identity.customScriptsAsString)
    }, [identity.customScriptsAsString]);

    const onSaveHandler = () => {
        dispatch(updateSetting('identity', {
            ...identity,
            customScriptsAsString
        }))
    }

    const onCustomScriptsAsStringChangeHandler = (value: any) => {
        setCustomScriptsAsString(value)
    }

    return (
        <>
            <Head>
                <link
                    rel={'stylesheet'}
                    type={'text/css'}
                    data-name={'vs/editor/editor.main'}
                    href={'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css'}
                />
            </Head>
            <div>
                <div className={'customScriptsAsStringSection'}>
                    <Editor
                        language={'html'}
                        // @ts-ignore
                        name={'customScriptsAsString'}
                        theme={'vs-dark'}
                        value={customScriptsAsString || ''}
                        onChange={onCustomScriptsAsStringChangeHandler}
                        classname='customScriptsAsString'
                        width={props.width || '100%'}
                        height={props.height || '70vh'}
                    />
                    <button className={'saveBtn btn btn-primary'} onClick={() => onSaveHandler()}>Save</button>
                </div>
            </div>
        </>
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
