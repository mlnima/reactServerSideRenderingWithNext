'use client';
import React, { FC, useState } from "react";
import { IInitialSettings } from "@repo/typescript-types";
import MonacoEditor from '@components/textEditors/MonacoEditor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


interface PropTypes {
    onChangeHandler: (value: any, key: string) => void;
    initialSettingsData: IInitialSettings;
}

const LayoutSettings: FC<PropTypes> = ({ onChangeHandler, initialSettingsData }) => {
    const [isStyleEditorOpen, setIsStyleEditorOpen] = useState(false);
    const [isPrimaryColorEditorOpen, setIsPrimaryColorEditorOpen] = useState(false);
    const [isSecondaryColorEditorOpen, setIsSecondaryColorEditorOpen] = useState(false);

    return (
        <div className={'setting-section'}>
            <div className={'field'}>
                <h2>Layout Settings:</h2>
            </div>
            <div className={'checkboxField'}>
                <p>Topbar:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'topbar'}
                    checked={initialSettingsData?.layoutSettings?.topbar}
                    className={'primaryInput'}
                />
            </div>
            <div className={'checkboxField'}>
                <p>Header:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'header'}
                    checked={initialSettingsData?.layoutSettings?.header}
                    className={'primaryInput'}
                />
            </div>
            <div className={'checkboxField'}>
                <p>Navigation:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'navigation'}
                    checked={initialSettingsData?.layoutSettings?.navigation}
                    className={'primaryInput'}
                />
            </div>
            <div className={'checkboxField'}>
                <p>Footer:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'footer'}
                    checked={initialSettingsData?.layoutSettings?.footer}
                    className={'primaryInput'}
                />
            </div>
            <div className={'checkboxField'}>
                <p>Languages Switcher in User Config Menu:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'languagesSwitcherInUserConfigMenu'}
                    checked={initialSettingsData?.layoutSettings?.languagesSwitcherInUserConfigMenu}
                    className={'primaryInput'}
                />
            </div>
            <div className={'checkboxField'}>
                <p>Theme Colors Switcher in User Config Menu:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'checkbox'}
                    name={'themeColorsSwitcherInUserConfigMenu'}
                    checked={initialSettingsData?.layoutSettings?.themeColorsSwitcherInUserConfigMenu}
                    className={'primaryInput'}
                />
            </div>
            <div className={'inputField'}>
                <p>Logo Url:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'text'}
                    name={'logoUrl'}
                    value={initialSettingsData?.layoutSettings?.logoUrl}
                    className={'primaryInput'}
                />
            </div>
            <div className={'inputField'}>
                <p>Logo Width:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'number'}
                    name={'logoWidth'}
                    value={initialSettingsData?.layoutSettings?.logoWidth}
                    className={'primaryInput'}
                />
            </div>
            <div className={'inputField'}>
                <p>Logo Height:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'number'}
                    name={'logoHeight'}
                    value={initialSettingsData?.layoutSettings?.logoHeight}
                    className={'primaryInput'}
                />
            </div>
            <div className={'inputField'}>
                <p>Desktop Max Inner Content Width:</p>
                <input
                    onChange={e => onChangeHandler(e, 'layoutSettings')}
                    type={'number'}
                    name={'maxInnerContentWidth'}
                    value={initialSettingsData?.contentSettings?.maxInnerContentWidth}
                    className={'primaryInput'}
                />
            </div>
            <div className={'field'}>
                <button className={'btn btn-dark'} onClick={() => setIsStyleEditorOpen(!isStyleEditorOpen)}>
                    Custom Styles
                    <FontAwesomeIcon icon={isStyleEditorOpen ? faChevronUp : faChevronDown} style={{ width: 16, height: 16 }} />
                </button>
                {isStyleEditorOpen && (
                    <MonacoEditor
                        language={'scss'}
                        name={'customStyles'}
                        defaultValue={initialSettingsData?.layoutSettings?.customStyles || ''}
                        value={initialSettingsData?.layoutSettings?.customStyles}
                        className={'initialSettings-editor'}
                        onParentChangeHandler={(e: string) => onChangeHandler(e, 'layoutSettings')}
                        height={'80vh'}
                    />
                )}
            </div>
            <div className={'field'}>
                <button className={'btn btn-dark'} onClick={() => setIsPrimaryColorEditorOpen(!isPrimaryColorEditorOpen)}>
                    Primary Mode Colors
                    <FontAwesomeIcon icon={isPrimaryColorEditorOpen ? faChevronUp : faChevronDown} style={{ width: 16, height: 16 }} />
                </button>
                {isPrimaryColorEditorOpen && (
                    <MonacoEditor
                        language={'scss'}
                        name={'primaryModeColors'}
                        defaultValue={initialSettingsData?.layoutSettings?.primaryModeColors || ''}
                        value={initialSettingsData?.layoutSettings?.primaryModeColors}
                        className={'initialSettings-editor'}
                        onParentChangeHandler={(e: string) => onChangeHandler(e, 'layoutSettings')}
                        height={'80vh'}
                    />
                )}
            </div>
            <div className={'field'}>
                <button className={'btn btn-dark'} onClick={() => setIsSecondaryColorEditorOpen(!isSecondaryColorEditorOpen)}>
                    Secondary Mode Colors
                    <FontAwesomeIcon icon={isSecondaryColorEditorOpen ? faChevronUp : faChevronDown} style={{ width: 16, height: 16 }} />
                </button>
                {isSecondaryColorEditorOpen && (
                    <MonacoEditor
                        language={'scss'}
                        name={'secondaryModeColors'}
                        defaultValue={initialSettingsData?.layoutSettings?.secondaryModeColors || ''}
                        value={initialSettingsData?.layoutSettings?.secondaryModeColors}
                        className={'initialSettings-editor'}
                        onParentChangeHandler={(e: string) => onChangeHandler(e, 'layoutSettings')}
                        height={'80vh'}
                    />
                )}
            </div>
        </div>
    );
};

export default LayoutSettings;