import React from 'react';
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
import {useDispatch, useSelector} from "react-redux";
import {updateSetting} from "@store/clientActions/settingsActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {adminPanelEditIdentity} from "@store/adminActions/adminPanelSettingsActions";

const customScript = (props: { width: any; height: any; }) => {
    const dispatch = useDispatch()
    const identity = useSelector(({adminPanelSettings}: StoreTypes) => adminPanelSettings?.identity)

    const onSaveHandler = () => {
        dispatch(updateSetting('identity', identity))
    }

    const onCustomScriptsAsStringChangeHandler = (value: any) => {
        dispatch(adminPanelEditIdentity({customScriptsAsString: value}))
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
                        value={identity?.customScriptsAsString || ''}
                        onChange={onCustomScriptsAsStringChangeHandler}
                        classname='customScriptsAsString'
                        width={props.width || '100%'}
                        height={props.height || '70vh'}
                    />
                    <button className={'saveBtn btn btn-primary'} onClick={() => onSaveHandler()}>
                        Save
                    </button>
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
