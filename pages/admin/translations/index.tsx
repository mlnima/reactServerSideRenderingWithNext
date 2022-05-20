import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {wrapper} from "@store_toolkit/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import {
    fetchReadTranslationsFile,
    fetchUpdateTranslationsFile,
    adminPanelEditTranslationsFile
} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {languagesOptions} from "@_variables/_variables";

const translations = () => {

    const dispatch = useDispatch()
    const translationsData = useSelector(({adminPanelFileManager}: StoreTypes) => adminPanelFileManager.translationsData)
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
    const [translationsFilePath, setTranslationsFilePath] = useState(
        () => `./public/locales/${activeEditingLanguage}/customTranslation.json`
    );

    const onChangeHandler = data => {
        dispatch(adminPanelEditTranslationsFile(data))
    }

    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        seActiveEditingLanguage(e.target.value)
    }

    useEffect(() => {
        setTranslationsFilePath(`./public/locales/${activeEditingLanguage}/customTranslation.json`)
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

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
    return {props: {}}
})

translations.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default translations;
