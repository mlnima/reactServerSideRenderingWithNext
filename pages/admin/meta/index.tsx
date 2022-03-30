import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useRouter} from "next/router";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {
    adminEditMeta,
    adminDeleteMeta,
    adminGetMeta,
    adminUpdateMeta
} from "../../../store/adminActions/adminPanelPostsActions";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {languagesOptions} from "@_variables/_variables";

let AdminMetaPageStyledDiv = styled.div`
  width: 95%;
  max-width: 1300px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .single-meta-page-section {
    width: 700px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    p {
      width: 200px;
    }

    input, textarea {
      min-width: 300px;
      border: 1px solid rgba(0, 0, 0, .1);
      padding: 3px 5px;
      background-color: white;

    }

    textarea {

      min-height: 200px;
    }


  }

  .preview-image {
    margin: 10px 0;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 280px;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

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
    const [deleteButton, setDeleteButton] = useState(false)

    useEffect(() => {
        if (router.query.new && router.query.metaType) {
            dispatch(adminEditMeta({
                // @ts-ignore
                name: '',
                type: router.query.metaType,
                description: '',
                imageUrl: '',
                imageUrlLock: false,
                translations: {},
                count: 0,
                lang: router.query.lang || 'default'
            }))


        } else if (router.query.id) {

            dispatch(adminGetMeta(router?.query?.id))

        }
    }, [props]);


    useEffect(() => {
        console.log(meta)
    }, [meta]);

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
            <label>Type: {meta.type}</label>
            <div className={'single-meta-page-section'}>
                <p>Language :</p>
                <select className={'custom-select'} onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                    <option value='default'>Default</option>
                    {languagesOptions}
                </select>
            </div>
            <div className={'single-meta-page-section'}>
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
            <div className={'single-meta-page-section'}>
                <p>Meta Image :</p>
                {/*// @ts-ignore*/}
                <input className={'form-control-input'} name={'imageUrl'} onChange={e => onInputChangeHandler(e)}
                       value={meta?.imageUrl || ''}/>

            </div>
            <div className={'single-meta-page-section'}>
                <p>Count :</p>
                {/*// @ts-ignore*/}
                <input type={'number'} className={'form-control-input'} name={'count'}
                       onChange={e => onInputChangeHandler(e)} value={meta?.count || 0}/>

            </div>
            <div className={'single-meta-page-section'}>
                <p>Likes :</p>
                {/*// @ts-ignore*/}
                <input type={'number'} className={'form-control-input'} name={'likes'}
                       onChange={e => onInputChangeHandler(e)} value={meta?.likes || 0}/>

            </div>
            <div className={'single-meta-page-section'}>
                <p>view :</p>
                {/*// @ts-ignore*/}
                <input type={'number'} className={'form-control-input'} name={'views'}
                       onChange={e => onInputChangeHandler(e)} value={meta?.views || 0}/>

            </div>
            <div className={'single-meta-page-section'}>
                <p>Rank :</p>
                {/*// @ts-ignore*/}
                <input type={'number'} className={'form-control-input'} name={'rank'}
                       onChange={e => onInputChangeHandler(e)} value={meta?.rank || 0}/>

            </div>
            <div className={'single-meta-page-section preview-image'}>
                {meta?.imageUrl ? <img src={meta.imageUrl} alt=""/> : null}
            </div>
            <div className={'single-meta-page-section'}>
                <p>Lock Meta Image :</p>
                <input type={'checkbox'} checked={meta.imageUrlLock} name={'imageUrlLock'}
                       onChange={e => dispatch(adminEditMeta({imageUrlLock: e.target.checked}))}/>
            </div>
            <div className={'single-meta-page-section'}>
                <p>Status :</p>
                <select className={'custom-select'} name={'status'} onChange={e => onInputChangeHandler(e)}
                        value={meta?.status}>
                    <option>select</option>
                    <option value='draft'>Draft</option>
                    <option value='published'>Published</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                </select>
            </div>
            <div className={'single-meta-page-section'}>
                <p>Meta Description :</p>
                <textarea className={'form-control-input'}
                          name={'description'}
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
                <button className='btn btn-primary' onClick={() => dispatch(adminUpdateMeta(meta))}>Update</button>

                {!deleteButton ?
                    <button className='btn btn-danger' onClick={() => setDeleteButton(true)}>I Want To Delete This
                        Meta</button> : null}
                {deleteButton ? <button className='btn btn-danger'
                                        onClick={() => dispatch(adminDeleteMeta(router?.query?.id))}>Delete</button> : null}

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


