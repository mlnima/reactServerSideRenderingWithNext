import React, {ChangeEvent, useEffect} from 'react';
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import {
    fetchAdminSaveNewPage,
    fetchAdminUpdatePage,
    adminEditPageField,
    fetchAdminDeleteCustomPage,
    fetchAdminPanelPage
} from "@store_toolkit/adminReducers/adminPanelPagesReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

let AdminEditCustomPageStyledDiv = styled.div`
  padding: 10px 1rem;
  .form-group {
    .form-control-input, .custom-select {
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

const page = (props: any) => {
    const {query, push} = useRouter()
    const dispatch = useAdminDispatch()
    const pageData = useSelector(({adminPanelPages}: Store) => adminPanelPages.page)

    useEffect(() => {
        if (query.id) {
            dispatch(fetchAdminPanelPage(query.id as string))
        }
    }, [props]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        const finalValue = e.target.value === 'true' ? true :
            e.target.value === 'false' ? false :
                e.target.value
        dispatch(adminEditPageField({[e.target.name]: finalValue}))
    }

    const onStyleChangeHandler = (value: string) => {
        dispatch(adminEditPageField({pageStyle: value}))
    }

    const onSaveHandler = () => {
        if (query.id) {
            dispatch(fetchAdminUpdatePage(pageData))
        } else {
            dispatch(fetchAdminSaveNewPage({pageData, push}))
        }
    }

    const onDeleteHandler = ()=>{
        dispatch(fetchAdminDeleteCustomPage(query.id as string))
        push('/admin/assets?assetsType=pages').finally()
    }

    return (
        <>
            <a href={'/admin/page?new=1'} className={'btn btn-primary'}>
                New Page
            </a>

            <AdminEditCustomPageStyledDiv className={'page-container'}>
                <div className={'form-group'}>
                    <p>Page Name (without Space):</p>
                    <input name={'pageName'}
                           className={'form-control-input'}
                           type={'text'}
                           placeholder={'page name'}
                           value={pageData?.pageName}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Title:</p>
                    <input name={'title'}
                           className={'form-control-input'}
                           placeholder={'title'}
                           type={'text'}
                           value={pageData?.title}
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Description:</p>
                    <textarea name={'description'}
                           className={'form-control-input'}
                           placeholder={'description'}
                           value={pageData?.description}
                              //@ts-ignore
                           onChange={e => onChangeHandler(e)}/>
                </div>
                <div className={'form-group'}>
                    <p>Sidebar:</p>
                    <select name={'sidebar'} className={'custom-select'} onChange={e => onChangeHandler(e)}
                            value={pageData?.sidebar}>
                        <option value={'no'}>No</option>
                        <option value={'left'}>Left</option>
                        <option value={'right'}>Right</option>
                        <option value={'both'}>Both</option>

                    </select>
                </div>
                <div className={'form-group'}>
                    <p>status:</p>
                    <select name={'status'} className={'custom-select'} onChange={e => onChangeHandler(e)}
                            value={pageData?.status} placeholder={'select'}>
                        <option >select</option>
                        <option value={'published'}>Published</option>
                        <option value={'draft'}>Draft</option>
                        <option value={'trash'}>Trash</option>
                    </select>
                </div>
                <Editor
                    language={'scss'}
                    width={props.width || '100%'}
                    height={props.height || '80vh'}
                    theme={'vs-dark'}
                    defaultValue={pageData?.pageStyle || ''}
                    value={pageData?.pageStyle || ''}
                    onChange={onStyleChangeHandler}
                />
                <div className={'actions-btns'}>
                    <button onClick={onSaveHandler} className={'btn btn-primary'}>Save</button>
                    <button onClick={onDeleteHandler} className={'btn btn-danger'}>Delete</button>
                </div>

            </AdminEditCustomPageStyledDiv>

        </>
    );
};


export default page;
