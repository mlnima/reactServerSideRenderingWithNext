import React, {FC, useState} from "react";
import styled from "styled-components";
import {InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";

const Style = styled.div``;

interface PropTypes {
    onChangeHandler: Function,
    initialSettingsData: InitialSettings
}

const LayoutSettings: FC<PropTypes> = ({onChangeHandler, initialSettingsData}) => {
    const [isStyleEditorOpen,setIsStyleEditorOpen] = useState(false)
    return (
        <Style  className={'setting-section'}>
            <h2>Layout Settings:</h2>
            <div className={'checkbox-field'}>
                <p>Topbar:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'topbar'}
                       checked={initialSettingsData?.layoutSettings?.topbar}
                       className={'form-control-input'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Header:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'header'}
                       checked={initialSettingsData?.layoutSettings?.header}
                       className={'form-control-input'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Navigation:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'navigation'}
                       checked={initialSettingsData?.layoutSettings?.navigation}
                       className={'form-control-input'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Footer:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'footer'}
                       checked={initialSettingsData?.layoutSettings?.footer}
                       className={'form-control-input'}/>
            </div>
            <p>Custom Style:</p>
            <button className={'btn btn-primary'} onClick={()=>setIsStyleEditorOpen(!isStyleEditorOpen)}>
                Styles Editor
            </button>
            {isStyleEditorOpen &&
                <MonacoEditor
                    language={'scss'}
                    name={'customStyles'}
                    defaultValue={initialSettingsData?.layoutSettings?.customStyles || ''}
                    value={initialSettingsData?.layoutSettings?.customStyles}
                    className={'initialSettings-editor'}
                    //@ts-ignore
                    onChange={(e: string) => onChangeHandler(e, 'layoutSettings')}
                    height={'80vh'}
                />
            }

        </Style>
    )
};
export default LayoutSettings;