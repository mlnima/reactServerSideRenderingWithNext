import React from 'react';
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useDispatch, useSelector} from "react-redux";
import {updateSetting} from "@store/adminActions/adminPanelSettingsActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {adminPanelEditIdentity} from "@store/adminActions/adminPanelSettingsActions";
const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})

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
