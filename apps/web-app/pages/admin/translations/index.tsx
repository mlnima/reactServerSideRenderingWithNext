import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {useSelector} from "react-redux";

import {
    fetchReadTranslationsFile,
    fetchUpdateTranslationsFile,
    adminPanelEditTranslationsFile
} from "../../../store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {languagesOptions} from "@_variables/variables";
import {useAdminDispatch} from "../../../store_toolkit/hooks";
import {Store} from "typescript-types";

const translations = () => {

    const dispatch = useAdminDispatch()
    const translationsData = useSelector(({adminPanelFileManager}: Store) => adminPanelFileManager.translationsData)
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
    const [translationsFilePath, setTranslationsFilePath] = useState(
        () => `./locales/${activeEditingLanguage}/customTranslation.json`
    );

    const onChangeHandler = data => {
        dispatch(adminPanelEditTranslationsFile(data))
    }

    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        seActiveEditingLanguage(e.target.value)
    }

    useEffect(() => {
        setTranslationsFilePath(`./locales/${activeEditingLanguage}/customTranslation.json`)
    }, [activeEditingLanguage]);

    useEffect(() => {
        dispatch(fetchReadTranslationsFile(translationsFilePath))
    }, [translationsFilePath]);

    const onSaveHandler = () => {
        dispatch(fetchUpdateTranslationsFile({path: translationsFilePath, data: translationsData}))
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

export default translations;
