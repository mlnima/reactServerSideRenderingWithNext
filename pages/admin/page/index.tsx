import React, {ChangeEvent, useEffect} from 'react';
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useSelector, useDispatch} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    adminEditPageField,
    adminGetPage,
    adminSaveNewPage,
    adminUpdatePage
} from "@store/adminActions/adminPanelPagesActions";

let AdminEditCustomPageStyledDiv = styled.div`
  input {
    background-color: white;
    width: 90%;
  }
`

const page = (props: any) => {
    const {query,push} = useRouter()
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
            dispatch(adminSaveNewPage(pageData,push))
        }
    }

    return (
        <>
            <Head>
                <link
                    rel={'stylesheet'}
                    type={'text/css'}
                    data-name={'vs/editor/editor.main'}
                    href={'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css'}
                />
            </Head>

            <a href={'/admin/page?new=1'} className={'btn btn-primary'} >New Page</a>

            <AdminEditCustomPageStyledDiv className={'page-container'}>
                <p>Page Name (without Space):</p>
                <input name={'pageName'} placeholder={'page name'} value={pageData.pageName}
                       onChange={e => onChangeHandler(e)}/>
                <p>Sidebar:</p>
                <select name={'sidebar'} onChange={e => onChangeHandler(e)} value={pageData.sidebar}>
                    <option value={'left'}>Left</option>
                    <option value={'right'}>Right</option>
                    <option value={'both'}>Both</option>
                    <option value={'false'}>No</option>
                </select>
                <p>status:</p>
                <select name={'status'} onChange={e => onChangeHandler(e)} value={pageData.status}>
                    <option value={'publish'}>Publish</option>
                    <option value={'draft'}>Draft</option>
                    <option value={'trash'}>Trash</option>
                </select>
                <Editor
                    language={'scss'}
                    width={props.width || '100%'}
                    height={props.height || '80vh'}
                    theme={'vs-dark'}
                    defaultValue={pageData.pageStyle || ''}
                    value={pageData.pageStyle || ''}
                    onChange={onStyleChangeHandler}
                />
                <button onClick={onSaveHandler}>Save</button>
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
