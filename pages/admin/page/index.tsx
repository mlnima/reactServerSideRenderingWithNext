import React, {ChangeEvent, useEffect} from 'react';
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector, useDispatch} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    adminDeleteCustomPage,
    adminEditPageField,
    adminGetPage,
    adminSaveNewPage,
    adminUpdatePage
} from "@store/adminActions/adminPanelPagesActions";

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
    const dispatch = useDispatch()
    const pageData = useSelector(({adminPanelPages}: StoreTypes) => adminPanelPages.page)

    useEffect(() => {
        if (query.id) {
            dispatch(adminGetPage(query.id))
        }
    }, [props]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        dispatch(adminEditPageField({[e.target.name]: e.target.value}))
    }

    const onStyleChangeHandler = (value: string) => {
        dispatch(adminEditPageField({pageStyle: value}))
    }

    const onSaveHandler = () => {
        if (query.id) {
            dispatch(adminUpdatePage(pageData))
        } else {
            dispatch(adminSaveNewPage(pageData, push))
        }
    }

    const onDeleteHandler = ()=>{
        dispatch(adminDeleteCustomPage(query.id))
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
                           value={pageData.pageName}
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
                            value={pageData.sidebar}>
                        <option value={'left'}>Left</option>
                        <option value={'right'}>Right</option>
                        <option value={'both'}>Both</option>
                        <option value={'false'}>No</option>
                    </select>
                </div>
                <div className={'form-group'}>
                    <p>status:</p>
                    <select name={'status'} className={'custom-select'} onChange={e => onChangeHandler(e)}
                            value={pageData.status}>
                        <option value={'publish'}>Publish</option>
                        <option value={'draft'}>Draft</option>
                        <option value={'trash'}>Trash</option>
                    </select>
                </div>
                <Editor
                    language={'scss'}
                    width={props.width || '100%'}
                    height={props.height || '80vh'}
                    theme={'vs-dark'}
                    defaultValue={pageData.pageStyle || ''}
                    value={pageData.pageStyle || ''}
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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default page;
