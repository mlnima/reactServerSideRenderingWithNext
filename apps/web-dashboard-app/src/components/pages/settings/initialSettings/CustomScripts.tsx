import React, {FC} from 'react';
import { useSelector} from "react-redux";
import {DashboardStore} from "@repo/typescript-types";
import {editIdentityAction, updateSettingAction} from "@store/reducers/settingsReducer";
import {useAppDispatch} from "@store/hooks";
import Editor from '@monaco-editor/react'
interface PropTypes{
    width?: any,
    height?: any
}
const CustomScript:FC<PropTypes> = ({width, height}) => {
    const dispatch = useAppDispatch()
    const identity = useSelector(({settings}: DashboardStore) => settings?.identity)

    const onSaveHandler = () => {
        dispatch(updateSettingAction({type:'identity',data: identity}))
    }

    const onCustomScriptsAsStringChangeHandler = (value: any) => {
        dispatch(editIdentityAction({customScriptsAsString: value}))
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
                    width={width || '100%'}
                    height={height || '70vh'}
                />
                <button className={'saveBtn btn btn-primary'} onClick={() => onSaveHandler()}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CustomScript;
