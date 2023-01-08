// @ts-nocheck
import Editor from "@monaco-editor/react";
import {FC,useMemo} from 'react';
import {WidgetData} from "typescript-types";


interface PropTypes {
    name: string,
    language?: string,
    theme?: string,
    value?: string,
    defaultValue?: string,
    className?: string,
    width?: number,
    height?: number,
    widgetSettings:any,
    widgetData:WidgetData,
    setWidgetData:Function,
    withTranslation?:boolean,
    // onChange: Function
}

const WidgetMonacoEditor:FC<PropTypes> = (
    {
        name,
        language,
        className,
        width,
        height,
        widgetSettings,
        widgetData,
        withTranslation,
        setWidgetData
    }) => {


    const onChangeHandler = (value: string) => {
        if (widgetSettings.activeEditingLanguage === 'default' || withTranslation === false){
            setWidgetData(prevState=>({
                ...prevState,
                [name]:value
            }))
        }else if (withTranslation && widgetSettings.activeEditingLanguage !== 'default' ) {
            setWidgetData(prevState=>({
                ...prevState,
                translations:{
                    ...(prevState?.translations || {}),
                    [widgetSettings.activeEditingLanguage]:{
                        ...(prevState?.translations?.[widgetSettings.activeEditingLanguage] || {}),
                        [name]:value
                    }
                }
            }))
        }
    }


    const editorValue = useMemo(()=>{
        return widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
    },[widgetData,widgetSettings])


    return (
        <Editor
            language={language || 'css'}
            theme={ 'vs-dark'}
            defaultValue={''}
            value={editorValue}
            // onMount={e => console.log(e)}
            onChange={onChangeHandler}
            className={className || ''}
            width={width || '100%'}
            height={height || '500px'}
        />
    )
}

export default WidgetMonacoEditor;