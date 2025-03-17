import {FC, useEffect, useState} from "react";
import {IWidgetData} from "@repo/typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";

interface IProps {
    onUniqueDataChangeHandler: Function,
    widgetData: IWidgetData,
}

const AuthenticationTypeWidgetModelFields: FC<IProps> = () => {

    // const [isColorEditorOpen, setIsColorEditorOpen] = useState(false)

    // useEffect(() => {
    //     console.log('widgetData?.uniqueData=> ',widgetData?.uniqueData)
    // }, [widgetData?.uniqueData]);

    return (
        <div>
            {/*<div className={'widgetSection'}>*/}
            {/*    <p>Languages Switcher:</p>*/}
            {/*    <input type={'checkbox'}*/}
            {/*           checked={widgetData?.uniqueData?.languagesSwitcher}*/}
            {/*           name={'languagesSwitcher'}*/}
            {/*           onChange={e => onUniqueDataChangeHandler(e)}/>*/}
            {/*</div>*/}

            {/*<div className={'widgetSection'}>*/}
            {/*    <p>Theme Colors Switcher:</p>*/}
            {/*    <input type={'checkbox'}*/}
            {/*           checked={widgetData?.uniqueData?.themeColorsSwitcher}*/}
            {/*           name={'themeColorsSwitcher'}*/}
            {/*           onChange={e => onUniqueDataChangeHandler(e)}/>*/}
            {/*</div>*/}
            {/*{(widgetData?.uniqueData?.themeColorsSwitcher || widgetData?.uniqueData?.userPreferenceConfig) &&*/}
            {/*    <>*/}
            {/*        <button className={'btn btn-primary'} onClick={() => setIsColorEditorOpen(!isColorEditorOpen)}>*/}
            {/*            {isColorEditorOpen ? 'Close Colors Editor' : 'Open Colors Editor'}*/}
            {/*        </button>*/}
            {/*        {isColorEditorOpen &&*/}
            {/*            <div className={'monaco-editor-section'}>*/}
            {/*                <p>DayModeNightMode Data:</p>*/}
            {/*                <MonacoEditor*/}
            {/*                    language={'scss'}*/}
            {/*                    name={'themeColorsSwitcherColors'}*/}
            {/*                    defaultValue={widgetData?.uniqueData?.themeColorsSwitcherColors || ''}*/}
            {/*                    value={widgetData?.uniqueData?.themeColorsSwitcherColors}*/}
            {/*                    className={'customStylesTextarea'}*/}
            {/*                    onChange={onUniqueDataChangeHandler}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        }*/}
            {/*    </>*/}
            {/*}*/}
        </div>
    )
};
export default AuthenticationTypeWidgetModelFields
