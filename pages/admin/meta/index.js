import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import {getSingleMeta, updateMeta} from "../../../_variables/ajaxPostsVariables";
import {getAbsolutePath} from "../../../_variables/_variables";
import {getMultipleSetting} from "../../../_variables/ajaxVariables";
import dataDecoder from "../../../server/tools/dataDecoder";

const meta = props => {

    const [metaData, setMetaData] = useState({
        translations: {}
    });
    const [siteSettings, setSiteSettings] = useState({
        translationLanguages: []
    });
    const [editingData, setEditingData] = useState({
        activeEditingLanguage: 'default'
    })

    useEffect(() => {
        console.log(metaData)
    }, [metaData]);


    useEffect(() => {
        console.log(props)
        if (props.identity) {
            setSiteSettings({
                ...siteSettings,
                ...props.identity.data
            })
        }
        if (props.metaInfo) {
            setMetaData({
                ...metaData,
                ...props.metaInfo.meta
            })
        }
    }, [props]);


    const onSaveHandler = () => {

    }


    const languagesOptions = (siteSettings.translationLanguages || []).map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })
    const onActiveEditingLanguageChangeHandler = e => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })
    }


    const onInputChangeHandler = e => {
        if (editingData.activeEditingLanguage === 'default') {
            setMetaData({
                ...metaData,
                [e.target.name]: e.target.value
            })

        } else {
            setMetaData({
                ...metaData,
                translations: {
                    ...metaData.translations,
                    [editingData.activeEditingLanguage]: {
                        ...metaData.translations[editingData.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    // const onSaveMetaHandler = () => {
    //  console.log(metaData)
    // }


    const updateMetaData = ()=>{
        updateMeta(metaData,window.location.origin).then(res=>{
            setMetaData({
                ...metaData,
                ...res.data.updated
            })
        })
    }

    return (
        <>
            <AdminLayout>
                <div className='single-meta-page'>
                    <div className='single-meta-page-section'>
                        <select onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                            <option value='default'>Default</option>
                            {languagesOptions}
                        </select>
                    </div>
                    <div className='single-meta-page-section'>
                        <input name='name' onChange={e => onInputChangeHandler(e)} value={
                            editingData.activeEditingLanguage === 'default' ? metaData.name :
                                metaData.translations ?
                                    metaData.translations[editingData.activeEditingLanguage] ?
                                        metaData.translations[editingData.activeEditingLanguage].name || '' : '' : ''
                        }/>
                    </div>
                    <div className='single-meta-page-section'>
                        <textarea name='description' onChange={e => onInputChangeHandler(e)} value={
                            editingData.activeEditingLanguage === 'default' ? metaData.description :
                                metaData.translations ?
                                    metaData.translations[editingData.activeEditingLanguage] ?
                                        metaData.translations[editingData.activeEditingLanguage].description || '' : '' : ''
                        }/>
                    </div>
                    <button onClick={() => updateMetaData()}>Update</button>


                </div>
            </AdminLayout>
        </>
    );
};

meta.getInitialProps = async ({query, req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let metaInfo = {}
    let settings;
    const settingsData = await getMultipleSetting({settings: ['identity']}, domainName, false, 'adminPostPage')
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    if (query.new && query.metaType) {
        metaInfo = {
            name: '',
            type: query.metaType,
            description: '',
            imageUrl: '',
            translations: {},
            count: 0,
            lang: query.lang || 'default'
        }
    } else if (query.id) {
        let metaInfoFetchedData = await getSingleMeta(query.id, domainName, false)
        metaInfo = metaInfoFetchedData.data ? metaInfoFetchedData.data : {}
    }
    return {metaInfo, query, ...settings}
}
export default meta;
