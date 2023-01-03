import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {useSelector} from "react-redux";
import languagesOptions from "@variables/languagesOptions";
import {DashboardStore, Store} from "typescript-types";
import {
    editTranslationsFileAction,
    readTranslationsFileAction,
    updateTranslationsFileAction
} from "@store/reducers/fileManagerReducer";
import {useAppDispatch} from "@store/hooks";

const Translations = () => {

    const dispatch = useAppDispatch()
    const translationsData = useSelector(({fileManager}: DashboardStore) => fileManager.translationsData)
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCAL ||process.env.REACT_APP_DEFAULT_LOCAL);
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
            translations
            <select onChange={e => onActiveEditingLanguageChangeHandler(e)} className={'custom-select'}>
                <option
                    value={process.env.NEXT_PUBLIC_DEFAULT_LOCAL}>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}
                </option>
                {languagesOptions}
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
