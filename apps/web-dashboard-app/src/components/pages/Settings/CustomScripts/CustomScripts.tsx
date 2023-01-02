import React, {FC} from 'react';
import dynamic from "next/dynamic";
import { useSelector} from "react-redux";
import {DashboardStore, Store} from "typescript-types";
import {editIdentityAction, updateSettingAction} from "@store/reducers/settingsReducer";
import {useAppDispatch} from "@store/hooks";

const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
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
