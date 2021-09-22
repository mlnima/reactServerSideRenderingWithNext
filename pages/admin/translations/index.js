import React, {useEffect, useState, useContext, useRef} from 'react';
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";
import {readTranslationsFile,updateTranslationsFile} from "../../../_variables/_ajaxFilesVariables";
import {languagesOptions} from "../../../_variables/_variables";

const translations = props => {
    const [activeEditingLanguage, seActiveEditingLanguage] = useState(() => process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
    const [translationsData, setTranslationsData] = useState('');
    const [translationsFilePath, setTranslationsFilePath] = useState(() => `./public/locales/${activeEditingLanguage}/customTranslation.json`);

    const onChangeHandler = data => {
        setTranslationsData(data)
    }

    const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })

    const onActiveEditingLanguageChangeHandler = e => {
        seActiveEditingLanguage(e.target.value)
    }

    useEffect(() => {
        setTranslationsFilePath(`./public/locales/${activeEditingLanguage}/customTranslation.json`)
    }, [activeEditingLanguage]);

    useEffect(() => {
        readTranslationsFile(translationsFilePath).then(res=>{
            setTranslationsData(res.data.data)

        })
    }, [translationsFilePath]);

    const onSaveHandler = ()=>{
        updateTranslationsFile(translationsFilePath,translationsData).then(res=>{

        })
    }


    return (
        <div className='translations'>
            translations
            <select onChange={e => onActiveEditingLanguageChangeHandler(e)}>

                <option value={process.env.NEXT_PUBLIC_DEFAULT_LOCAL}>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}</option>
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
                    //className='style-section-editor'
                />
                <button onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    );
};
export default translations;
