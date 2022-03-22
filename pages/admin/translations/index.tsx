import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    adminPanelEditTranslationsFile,
    adminPanelReadTranslationsFile, adminPanelUpdateTranslationsFile
} from "@store/adminActions/adminPanelFileManagerActions";


// @ts-ignore
const translations: FC = () => {
    const dispatch = useDispatch()
    const translationsData = useSelector(({adminPanelFileManager}: StoreTypes) => adminPanelFileManager.translationsData)
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
    const [translationsFilePath, setTranslationsFilePath] = useState(() => `./public/locales/${activeEditingLanguage}/customTranslation.json`);

    const onChangeHandler = data => {
        dispatch(adminPanelEditTranslationsFile(data))
    }
    // @ts-ignore
    const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })

    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        seActiveEditingLanguage(e.target.value)
    }

    useEffect(() => {
        setTranslationsFilePath(`./public/locales/${activeEditingLanguage}/customTranslation.json`)
    }, [activeEditingLanguage]);

    useEffect(() => {
        dispatch(adminPanelReadTranslationsFile(translationsFilePath))
    }, [translationsFilePath]);

    const onSaveHandler = () => {
        dispatch(adminPanelUpdateTranslationsFile(translationsFilePath, translationsData))
    }

    return (

        <div className='translations'>
            translations
            <select onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                <option
                    value={process.env.NEXT_PUBLIC_DEFAULT_LOCAL}>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}</option>
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
                <button onClick={onSaveHandler}>Save</button>
            </div>
        </div>

    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default translations;
