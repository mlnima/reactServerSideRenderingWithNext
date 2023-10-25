import React, {FC, useState} from "react";
import styled from "styled-components";
import {InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";
import UserConfigMenu from "web-application/app/components/global/UserConfigMenu/UserConfigMenu";

const Style = styled.div``;

interface PropTypes {
    onChangeHandler: Function,
    initialSettingsData: InitialSettings
}

const LayoutSettings: FC<PropTypes> = ({onChangeHandler, initialSettingsData}) => {
    const [isStyleEditorOpen,setIsStyleEditorOpen] = useState(false)
    const [isPrimaryColorEditorOpen,setIsPrimaryColorEditorOpen] = useState(false)
    const [isSecondaryColorEditorOpen,setIsSecondaryColorEditorOpen] = useState(false)
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
                <p>Languages Switcher in User Config Menu:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'languagesSwitcherInUserConfigMenu'}
                       checked={initialSettingsData?.layoutSettings?.languagesSwitcherInUserConfigMenu}
                       className={'primaryInput'}/>
            </div>
            <div className={'checkbox-field'}>
                <p>Theme Colors Switcher in User Config Menu:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'checkbox'}
                       name={'themeColorsSwitcherInUserConfigMenu'}
                       checked={initialSettingsData?.layoutSettings?.themeColorsSwitcherInUserConfigMenu}
                       className={'primaryInput'}/>
            </div>
            <div className={'input-field'}>
                <p>Logo Url:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'text'}
                       name={'logoUrl'}
                       value={initialSettingsData?.layoutSettings?.logoUrl}
                       className={'primaryInput'}/>
            </div>
            <div className={'input-field'}>
                <p>Logo Width:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'number'}
                       name={'logoWidth'}
                       value={initialSettingsData?.layoutSettings?.logoWidth}
                       className={'primaryInput'}/>
            </div>
            <div className={'input-field'}>
                <p>Logo Height:</p>
                <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                       type={'number'}
                       name={'logoHeight'}
                       value={initialSettingsData?.layoutSettings?.logoHeight}
                       className={'primaryInput'}/>
            </div>
            <div className={'styleSection'}>
                <button className={'btn btn-primary'} onClick={()=>setIsStyleEditorOpen(!isStyleEditorOpen)}>
                    Custom Styles
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
            </div>
            <div className={'styleSection'}>
                <button className={'btn btn-primary'} onClick={()=>setIsPrimaryColorEditorOpen(!isPrimaryColorEditorOpen)}>
                    Primary Mode Colors
                </button>

                {isPrimaryColorEditorOpen &&
                    <MonacoEditor
                        language={'scss'}
                        name={'primaryModeColors'}
                        defaultValue={initialSettingsData?.layoutSettings?.primaryModeColors || ''}
                        value={initialSettingsData?.layoutSettings?.primaryModeColors}
                        className={'initialSettings-editor'}
                        //@ts-ignore
                        onChange={(e: string) => onChangeHandler(e, 'layoutSettings')}
                        height={'80vh'}
                    />
                }
            </div>
            <div className={'styleSection'}>
                <button className={'btn btn-primary'} onClick={()=>setIsSecondaryColorEditorOpen(!isSecondaryColorEditorOpen)}>
                    Secondary Mode Colors
                </button>
                {isSecondaryColorEditorOpen &&
                    <MonacoEditor
                        language={'scss'}
                        name={'secondaryModeColors'}
                        defaultValue={initialSettingsData?.layoutSettings?.secondaryModeColors || ''}
                        value={initialSettingsData?.layoutSettings?.secondaryModeColors}
                        className={'initialSettings-editor'}
                        //@ts-ignore
                        onChange={(e: string) => onChangeHandler(e, 'layoutSettings')}
                        height={'80vh'}
                    />
                }
            </div>
        </Style>
    )
};
export default LayoutSettings;