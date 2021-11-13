import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useRouter} from "next/router";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {adminEditMeta, adminDeleteMeta, adminGetMeta, adminUpdateMeta} from "../../../store/actions/adminPanelPostsActions";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {languagesOptions} from "../../../_variables/_variables";

let AdminMetaPageStyledDiv = styled.div`
  width: 95%;
  max-width: 1300px;

  .single-meta-page-section {
    max-width: 600px;
    margin: auto;

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

  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .red-action-btn-link {
      background-color: red;
      border: none;
      padding: 10px 30px;
    }
  }



`

const meta = (props: any) => {
    const dispatch = useDispatch()
    const meta = useSelector((store: StoreTypes) => store?.adminPanelPosts.meta)
    const router = useRouter()

    const [editingData, setEditingData] = useState({
        activeEditingLanguage: 'default'
    })

    useEffect(() => {
        console.log(meta)
    }, [meta]);


    useEffect(() => {
        if (router.query.new && router.query.metaType) {
            dispatch(adminEditMeta({
                // @ts-ignore
                name: '',
                type: router.query.metaType,
                description: '',
                imageUrl: '',
                translations: {},
                count: 0,
                lang: router.query.lang || 'default'
            }))


        } else if (router.query.id) {

            dispatch(adminGetMeta(router?.query?.id))

        }
    }, [props]);


    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })
    }


    const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editingData.activeEditingLanguage === 'default') {
            dispatch(adminEditMeta({[e.target.name]: e.target.value}))
        } else {
            dispatch(adminEditMeta({
                translations: {
                    ...(meta?.translations || {}),
                    [editingData.activeEditingLanguage]: {
                        // @ts-ignore
                        ...(meta?.translations?.[editingData.activeEditingLanguage] || {}),
                        [e.target.name]: e.target.value
                    }
                }
            }))
        }
    }




    return (

        <AdminMetaPageStyledDiv className='single-meta-page'>
            <div className='single-meta-page-section'>
                <p>Language :</p>
                <select className={'custom-select'} onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                    <option value='default'>Default</option>
                    {languagesOptions}
                </select>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Name :</p>
                <input className={'form-control-input'} name='name' onChange={e => onInputChangeHandler(e)} value={
                    // @ts-ignore

                    editingData.activeEditingLanguage === 'default' ? meta.name :
                        meta?.translations ?
                            // @ts-ignore

                            meta.translations[editingData.activeEditingLanguage] ?
                                // @ts-ignore

                                meta.translations[editingData.activeEditingLanguage].name || '' : '' : ''
                }/>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Image :</p>
                {/*// @ts-ignore*/}
                <input className={'form-control-input'} name='imageUrl' onChange={e => onInputChangeHandler(e)} value={meta?.imageUrl || ''}/>
                <div className='preview-image'>
                    {meta?.imageUrl ? <img src={meta.imageUrl} alt=""/> : null}
                </div>
            </div>
            <div className='single-meta-page-section'>
                <p>Status :</p>
                <select className={'custom-select'} name='status' onChange={e => onInputChangeHandler(e)} value={meta?.status}>
                    <option>select</option>
                    <option value='draft'>Draft</option>
                    <option value='published'>Published</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                </select>
            </div>
            <div className='single-meta-page-section'>
                <p>Meta Description :</p>
                <textarea className={'form-control-input'}
                          name='description'
                          onChange={e => onInputChangeHandler(e)}
                          value={editingData?.activeEditingLanguage && editingData?.activeEditingLanguage === 'default' ? meta?.description || '' :
                              meta?.translations ?
                                  // @ts-ignore
                                  meta.translations[editingData.activeEditingLanguage] ?
                                      // @ts-ignore
                                      meta.translations[editingData.activeEditingLanguage].description || '' : '' : ''
                          }


                />
            </div>
            <div className='action-buttons'>
                {/*// @ts-ignore*/}
                <button className='green-action-btn-link' onClick={() => dispatch(adminUpdateMeta(meta))}>Update</button>
                {/*// @ts-ignore*/}
                <button className=' red-action-btn-link' onClick={() => dispatch(adminDeleteMeta(router?.query?.id))}>delete</button>
            </div>


        </AdminMetaPageStyledDiv>

    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default meta;


