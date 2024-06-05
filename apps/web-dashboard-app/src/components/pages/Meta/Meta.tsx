import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {LanguagesOptions} from "ui";
import {DashboardStore} from "typescript-types";
import {useAppDispatch} from "@store/hooks";
import {useSearchParams} from "react-router-dom";
import {deleteMetaAction, editMetaAction, getMetaAction, updateMetaAction} from "@store/reducers/postsReducer";

let AdminMetaPageStyledDiv =  styled.div`
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
      padding: 3px 5px;
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

const Meta = () => {
    const dispatch = useAppDispatch()
    const meta = useSelector(({posts}: DashboardStore) => posts.meta)
    const [search, setSearch] = useSearchParams();
    const metaId = useMemo(() => search.get('id'), [search])
    const newMeta = useMemo(() => search.get('new'), [search])
    const metaType = useMemo(() => search.get('metaType'), [search])
    const lang = useMemo(() => search.get('lang'), [search])

    const [editingData, setEditingData] = useState({
        activeEditingLanguage: 'default'
    })

    const [deleteButton, setDeleteButton] = useState(false)

    useEffect(() => {
        if (newMeta) {
            dispatch(editMetaAction({
                // @ts-ignore
                name: '',
                type: metaType || 'categories',
                description: '',
                imageUrl: '',
                imageUrlLock: false,
                translations: {},
                count: 0,
                lang: lang || 'default'
            }))
        } else if (metaId) {
            dispatch(getMetaAction(metaId))
        }
    }, [metaId]);


    const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditingData({
            ...editingData,
            activeEditingLanguage: e.target.value
        })
    }


    const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

        if (editingData.activeEditingLanguage === 'default') {
            dispatch(editMetaAction({[e.target.name]: e.target.value}))
        } else {
            dispatch(editMetaAction({
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(editMetaAction({[e.target.name]: e.target.value}))
    }


    if (meta) {
        return (
            <AdminMetaPageStyledDiv className='single-meta-page'>
                {!!meta?.type && <label>Type: {meta?.type}</label>}

                <div className={'single-meta-page-section'}>
                    <p>Language :</p>
                    <select className={'primarySelect'} onChange={e => onActiveEditingLanguageChangeHandler(e)}>
                        <option value='default'>Default</option>
                        <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''}/>
                    </select>
                </div>
                <div className={'single-meta-page-section'}>
                    <p>Meta Name :</p>
                    <input className={'primaryInput'} name='name' onChange={e => onInputChangeHandler(e)} value={
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
                    <input className={'primaryInput'} name={'imageUrl'} onChange={e => onChangeHandler(e)}
                           value={meta?.imageUrl || ''}/>

                </div>
                <div className={'single-meta-page-section'}>
                    <p>Count :</p>
                    {/*// @ts-ignore*/}
                    <input type={'number'} className={'primaryInput'} name={'count'}
                           onChange={e => onChangeHandler(e)} value={meta?.count || 0}/>

                </div>
                <div className={'single-meta-page-section'}>
                    <p>Likes :</p>
                    {/*// @ts-ignore*/}
                    <input type={'number'} className={'primaryInput'} name={'likes'}
                           onChange={e => onChangeHandler(e)} value={meta?.likes || 0}/>

                </div>
                <div className={'single-meta-page-section'}>
                    <p>view :</p>
                    {/*// @ts-ignore*/}
                    <input type={'number'} className={'primaryInput'} name={'views'}
                           onChange={e => onChangeHandler(e)} value={meta?.views || 0}/>

                </div>
                <div className={'single-meta-page-section'}>
                    <p>Rank :</p>
                    <input type={'number'} className={'primaryInput'} name={'rank'}
                           onChange={e => onChangeHandler(e)} value={meta?.rank || 0}/>

                </div>
                {meta?.type === 'categories' &&
                    <div className={'single-meta-page-section'}>
                        <p>Parent Id :</p>

                        <input type={'text'} className={'primaryInput'} name={'parentId'}
                               onChange={e => onChangeHandler(e)} value={meta?.parentId || ''}/>

                    </div>
                }

                <div className={'single-meta-page-section preview-image'}>
                    {meta?.imageUrl ? <img src={meta.imageUrl} alt=""/> : null}
                </div>
                <div className={'single-meta-page-section'}>
                    <p>Lock Meta Image :</p>
                    <input type={'checkbox'} checked={meta.imageUrlLock} name={'imageUrlLock'}
                           onChange={e => dispatch(editMetaAction({imageUrlLock: e.target.checked}))}/>
                </div>
                <div className={'single-meta-page-section'}>
                    <p>Type :</p>
                    <select className={'primarySelect'} name={'type'} onChange={e => onChangeHandler(e)}
                            value={meta?.type}>
                        <option value=''>Select</option>
                        <option value='tags'>Tag</option>
                        <option value='categories'>Category</option>
                        <option value='actors'>Actor</option>
                    </select>
                </div>
                <div className={'single-meta-page-section'}>
                    <p>Status :</p>
                    <select className={'primarySelect'} name={'status'} onChange={e => onChangeHandler(e)}
                            value={meta?.status}>
                        <option value=''>Select</option>
                        <option value='draft'>Draft</option>
                        <option value='published'>Published</option>
                        <option value='trash'>Trash</option>
                        <option value='pending'>Pending</option>
                    </select>
                </div>


                <div className={'single-meta-page-section'}>
                    <p>Meta Description :</p>
                    <textarea className={'primaryInput'}
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
                    <button className='btn btn-primary'
                            onClick={() => dispatch(updateMetaAction(meta))}>Update
                    </button>

                    {!deleteButton && <button className={'btn btn-danger'}
                                              onClick={() => setDeleteButton(true)}>
                        I Want To Delete This Meta
                    </button>}
                    {!!deleteButton &&
                        <button onClick={() => dispatch(deleteMetaAction(metaId))}
                                className='btn btn-danger'>
                            Delete
                        </button>}

                </div>

            </AdminMetaPageStyledDiv>

        );
    } else return <h1>Not Found</h1>
};

export default Meta;


