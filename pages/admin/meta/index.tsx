import React, {useEffect, useState} from 'react';
import {deleteMeta, getSingleMeta, updateMeta} from "../../../_variables/ajaxPostsVariables";
import {getAbsolutePath} from "../../../_variables/_variables";
import {getMultipleSetting} from "../../../_variables/ajaxVariables";
import styled from "styled-components";
import {useRouter} from "next/router";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

let StyledDiv = styled.div`
  .single-meta-page-section {
    input, textarea {
      min-width: 300px;
      border: 1px solid rgba(0, 0, 0, .1);
      padding: 3px 5px;
      background-color: white;

    }

    textarea {

      min-height: 200px;
    }

    .preview-image {
      margin: 10px 0;

      img {
        width: 280px;
      }
    }
  }
  .action-buttons{
    display: flex; 
    justify-content: space-between;
    align-items: center;
    .red-action-btn-link{
      background-color: red;
      border: none;
      padding: 10px 30px;
    }
  }



`

const meta = (props:any) => {
  const router = useRouter()
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
    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })
    }


    const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
                        // @ts-ignore

                        ...metaData.translations[editingData.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    const updateMetaData = () => {
        updateMeta(metaData).then(res => {
            setMetaData({
                ...metaData,
                // @ts-ignore

                ...res.data.updated
            })
        })
    }

    return (

        <StyledDiv className='single-meta-page'>
            <div className='single-meta-page-section'>
                <p>Language :</p>
                <select onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                    <option value='default'>Default</option>
                    {languagesOptions}
                </select>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Name :</p>
                <input name='name' onChange={e => onInputChangeHandler(e)} value={
                    // @ts-ignore

                    editingData.activeEditingLanguage === 'default' ? metaData.name :
                        metaData.translations ?
                            // @ts-ignore

                            metaData.translations[editingData.activeEditingLanguage] ?
                                // @ts-ignore

                            metaData.translations[editingData.activeEditingLanguage].name || '' : '' : ''
                }/>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Image :</p>
                {/*// @ts-ignore*/}

                <input name='imageUrl' onChange={e => onInputChangeHandler(e)} value={metaData?.imageUrl ?? ''}/>
                <div className='preview-image'>
                    {/*// @ts-ignore*/}

                    <img src={metaData.imageUrl} alt=""/>
                </div>
            </div>
            <div className='single-meta-page-section'>
                <p>Status :</p>
                {/*// @ts-ignore*/}
                <select name='status' onChange={e => onInputChangeHandler(e)} value={metaData?.status}>
                    <option >select</option>
                    <option value='draft'>Draft</option>
                    <option value='published'>Published</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                </select>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Description :</p>
                <textarea name='description' onChange={e => onInputChangeHandler(e)} value={
                    // @ts-ignore
                    editingData.activeEditingLanguage === 'default' ? metaData.description :
                        metaData.translations ?
                            // @ts-ignore
                            metaData.translations[editingData.activeEditingLanguage] ?
                                // @ts-ignore
                                metaData.translations[editingData.activeEditingLanguage].description || '' : '' : ''
                }/>
            </div>
            <div className='action-buttons'>
                <button className='green-action-btn-link' onClick={() => updateMetaData()}>Update</button>
                {/*// @ts-ignore*/}
                <button className=' red-action-btn-link' onClick={() => deleteMeta(metaData._id).then(()=>router.back())}>delete</button>
            </div>



        </StyledDiv>

    );
};


// export const getServerSideProps = async ({req, query}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let metaInfo = {}
//     let settings;
//     const settingsData = await getMultipleSetting({settings: ['identity']},  false)
//     settings = settingsData.data.settings ? settingsData.data.settings : []
//     if (query.new && query.metaType) {
//         metaInfo = {
//             name: '',
//             type: query.metaType,
//             description: '',
//             imageUrl: '',
//             translations: {},
//             count: 0,
//             lang: query.lang || 'default'
//         }
//     } else if (query.id) {
//         let metaInfoFetchedData = await getSingleMeta(query.id, domainName, false)
//         metaInfo = metaInfoFetchedData.data ? metaInfoFetchedData.data : {}
//     }
//     return {props: {metaInfo, query, ...settings}}
// }

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default meta;
