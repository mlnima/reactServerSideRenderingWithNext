import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import {
    editTranslationsFileAction,
    readTranslationsFileAction,
    updateTranslationsFileAction
} from "@store/reducers/fileManagerReducer";
import {useAppDispatch} from "@store/hooks";
import {LanguagesOptions} from "@repo/ui";


const Translations = () => {

    const dispatch = useAppDispatch()
    const translationsData = useSelector(({fileManager}: DashboardStore) => fileManager.translationsData)
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCALE ||process.env.REACT_APP_DEFAULT_LOCALE);
    const [translationsFilePath, setTranslationsFilePath] = useState(
        () => `./locales/${activeEditingLanguage}/customTranslation.json`
    );

    const onChangeHandler = (data:any )=> {
        dispatch(editTranslationsFileAction(data))
    }

    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        seActiveEditingLanguage(e.target.value)
    }

    useEffect(() => {
        setTranslationsFilePath(`./locales/${activeEditingLanguage}/customTranslation.json`)
    }, [activeEditingLanguage]);

    useEffect(() => {
        dispatch(readTranslationsFileAction(translationsFilePath))
    }, [translationsFilePath]);

    const onSaveHandler = () => {
        dispatch(updateTranslationsFileAction({path: translationsFilePath, data: translationsData}))
    }

    return (

        <div className='translations'>
            Translations
            <select onChange={e => onActiveEditingLanguageChangeHandler(e)} className={'primarySelect'}>
                <option
                    value={process.env.NEXT_PUBLIC_DEFAULT_LOCALE}>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'Default'}
                </option>
                <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''}/>
            </select>

            <div className='editor-area'>
                <Editor
                    language='json'
                    width={'100%'}
                    height={'80vh'}
                    theme="vs-dark"
                    defaultValue={translationsData}
                    value={translationsData}
                    onChange={onChangeHandler}
                />
                <button onClick={onSaveHandler} className={'btn btn-primary'}>Save</button>
            </div>
        </div>

    );
};

export default Translations;
