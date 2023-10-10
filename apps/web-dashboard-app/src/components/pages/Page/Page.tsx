import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import {
    createNewPageAction,
    deletePageAction,
    editPageFieldAction,
    getPageAction,
    updatePageAction
} from "@store/reducers/pagesReducer";
import {useAppDispatch} from "@store/hooks";
import {useSearchParams} from "react-router-dom";

let AdminEditCustomPageStyledDiv = styled.div`
  padding: 10px 1rem;
  .form-group {
    margin: 5px 0;
    .primaryInput, .primarySelect {
      max-width: 300px;
    }
  }
  
  .actions-btns{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-primary{
      margin: 20px 0;
    }
  }

`

const Page = (props: any) => {

    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams();

    const [openStyleEditor, setOpenStyleEditor] = useState(false);
    const pageId = useMemo(()=>search.get('id'),[search])

    const pageData = useSelector(({pages}: DashboardStore) => pages.page)

    useEffect(() => {
        if (pageId) {
            dispatch(getPageAction(pageId))
        }
    }, [pageId]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const finalValue = e.target.value === 'true' ? true :
            e.target.value === 'false' ? false :
                e.target.value
        dispatch(editPageFieldAction({[e.target.name]: finalValue}))
    }

    const onStyleChangeHandler = (value: string) => {
        dispatch(editPageFieldAction({pageStyle: value}))
    }

    const onSaveHandler = () => {
        if (pageId) {
            dispatch(updatePageAction(pageData))
        } else {
            dispatch(createNewPageAction({pageData}))
        }
    }

    const onDeleteHandler = ()=>{
        dispatch(deletePageAction(pageId as string))
        // push('/admin/assets?assetsType=pages').finally()
    }

    return (
        <>
            <a href={'/dashboard/page?new=1'} className={'btn btn-primary'}>
                New Page
            </a>

            <AdminEditCustomPageStyledDiv className={'page-container'}>
                <div className={'form-group'}>
                    <p>Page Name (without Space):</p>
                    <input name={'pageName'}
                           className={'primaryInput'}
                           type={'text'}
                           placeholder={'page name'}
                           value={pageData?.pageName}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Title:</p>
                    <input name={'title'}
                           className={'primaryInput'}
                           placeholder={'title'}
                           type={'text'}
                           value={pageData?.title}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Description:</p>
                    <textarea name={'description'}
                              className={'primaryInput'}
                              placeholder={'description'}
                              value={pageData?.description}
                        //@ts-ignore
                              onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Sidebar:</p>
                    <select name={'sidebar'} className={'primarySelect'} onChange={e => onChangeHandler(e)}
                            value={pageData?.sidebar}>
                        <option value={'no'}>No</option>
                        <option value={'left'}>Left</option>
                        <option value={'right'}>Right</option>
                        <option value={'both'}>Both</option>

                    </select>
                </div>
                <div className={'form-group'}>
                    <p>status:</p>
                    <select name={'status'} className={'primarySelect'} onChange={e => onChangeHandler(e)}
                            value={pageData?.status} placeholder={'select'}>
                        <option >select</option>
                        <option value={'published'}>Published</option>
                        <option value={'draft'}>Draft</option>
                        <option value={'trash'}>Trash</option>
                    </select>
                </div>
                <button className={'btn btn-primary'} onClick={()=>setOpenStyleEditor(!openStyleEditor)}>Custom Styles:</button>
                {openStyleEditor &&                <Editor
                    language={'scss'}
                    width={props.width || '100%'}
                    height={props.height || '80vh'}
                    theme={'vs-dark'}
                    defaultValue={pageData?.pageStyle || ''}
                    value={pageData?.pageStyle || ''}
                    //@ts-ignore
                    onChange={onStyleChangeHandler}
                />}

                <div className={'actions-btns'}>
                    <button onClick={onSaveHandler} className={'btn btn-primary'}>Save</button>
                    <button onClick={onDeleteHandler} className={'btn btn-danger'}>Delete</button>
                </div>

            </AdminEditCustomPageStyledDiv>

        </>
    );
};


export default Page;
