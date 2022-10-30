import React from 'react';
import dynamic from "next/dynamic";
import { useSelector} from "react-redux";
import {adminEditIdentity, adminPanelUpdateSetting} from "../../../../store_toolkit/adminReducers/adminPanelSettingsReducer";
import {useAdminDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})

const customScript = (props: { width: any; height: any; }) => {
    const dispatch = useAdminDispatch()
    const identity = useSelector(({adminPanelSettings}: Store) => adminPanelSettings?.identity)

    const onSaveHandler = () => {
        dispatch(adminPanelUpdateSetting({type:'identity',data: identity}))
    }

    const onCustomScriptsAsStringChangeHandler = (value: any) => {
        dispatch(adminEditIdentity({customScriptsAsString: value}))
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

export default customScript;
