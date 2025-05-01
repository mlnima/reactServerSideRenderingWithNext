import React, {FC, useState} from "react";
import MonacoEditor from '@components/textEditors/MonacoEditor';

interface IProps {
    onChangeHandler: any,
    uniqueData: any
}

const UserPreferenceConfigModelFields: FC<IProps> = ({onChangeHandler, uniqueData}) => {
    const [isColorEditorOpen, setIsColorEditorOpen] = useState(false)
    return (
        <>
            <div className={'widgetSection'}>
                <p>Languages Switcher:</p>
                <input type={'checkbox'}
                       checked={uniqueData?.languagesSwitcher}
                       name={'languagesSwitcher'}
                       onChange={onChangeHandler}/>
            </div>
            <div className={'widgetSection'}>
                <p>Theme Colors Switcher:</p>
                <input type={'checkbox'}
                       checked={uniqueData?.themeColorsSwitcher}
                       name={'themeColorsSwitcher'}
                       onChange={onChangeHandler}/>
            </div>
            {uniqueData?.themeColorsSwitcher &&
                <>
                    <button className={'btn btn-primary'} onClick={() => setIsColorEditorOpen(!isColorEditorOpen)}>
                        {isColorEditorOpen ? 'Close Colors Editor' : 'Open Colors Editor'}
                    </button>
                    {isColorEditorOpen &&
                        <div className={'monaco-editor-section'}>
                            <p>DayModeNightMode Data:</p>
                            <MonacoEditor
                                language={'scss'}
                                name={'themeColorsSwitcherColors'}
                                defaultValue={uniqueData?.themeColorsSwitcherColors || ''}
                                value={uniqueData?.themeColorsSwitcherColors}
                                className={'customStylesTextarea'}
                                onParentChangeHandler={onChangeHandler}
                            />
                        </div>
                    }
                </>
            }
        </>
    )
};

export default UserPreferenceConfigModelFields;
