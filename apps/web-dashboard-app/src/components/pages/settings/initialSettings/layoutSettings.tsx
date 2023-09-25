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
    const [isColorEditorOpen,setIsColorEditorOpen] = useState(false)
    return (
        <Style  className={'setting-section'}>
            <h2>Layout Settings:</h2>
            <div className={'checkbox-field'}>
                <p>Topbar:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'topbar'}
                       checked={initialSettingsData?.layoutSettings?.topbar}
                       className={'primaryInput'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Header:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'header'}
                       checked={initialSettingsData?.layoutSettings?.header}
                       className={'primaryInput'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Navigation:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'navigation'}
                       checked={initialSettingsData?.layoutSettings?.navigation}
                       className={'primaryInput'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Footer:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'footer'}
                       checked={initialSettingsData?.layoutSettings?.footer}
                       className={'primaryInput'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Sidebar Width:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'number'}
                       name={'sidebarWidth'}
                       value={initialSettingsData?.layoutSettings?.sidebarWidth}
                       placeholder={'320px is default'}
                       className={'primaryInput'}/>
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
            <p>Custom Colors:</p>
            <button className={'btn btn-primary'} onClick={()=>setIsColorEditorOpen(!isColorEditorOpen)}>
                Colors Editor
            </button>
            {isColorEditorOpen &&
                <MonacoEditor
                    language={'scss'}
                    name={'customColors'}
                    defaultValue={initialSettingsData?.layoutSettings?.customColors || ''}
                    value={initialSettingsData?.layoutSettings?.customColors}
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