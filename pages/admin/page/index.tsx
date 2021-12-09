import React, {ChangeEvent, useEffect, useState} from 'react';
import {saveNewPage, getPageData, updatePage} from "../../../_variables/ajaxVariables";
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";

let AdminEditCustomPageStyledDiv = styled.div`
  input {
    background-color: white;
    width: 90%;
  }
`


//**********TS is not applied here correctly *********
const page = (props: any) => {
    const router = useRouter()
    const [state, setState] = useState({
        pageName: '',
        sidebar: true,
        status: 'publish',
        imageUrl: '',
        pageStyle: ''

    });

    useEffect(() => {
        if (router.query.id) {
            getPageData({id: router.query.id}).then(res => {
                // @ts-ignore
                if (res?.data?.pageData) {
                    // @ts-ignore
                    setState({
                        ...state,
                        // @ts-ignore
                        ...res.data.pageData
                    })
                }

            })
        }

    }, [props]);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const onStyleChangeHandler = (value: string) => {
        setState({
            ...state,
            pageStyle: value
        })
    }

    const onSaveHandler = () => {
        if (router.query.id) {

            updatePage({pageData: state}).then(res => {

            })
        } else {
            saveNewPage({pageData: {...state, pageName: state.pageName.replace(' ', '')}}).then(res => {
                // @ts-ignore
                const pageId = res.data.savedPageData._id
                router.push(`/admin/page?id=${pageId}`)

            })
        }

    }


    // @ts-ignore
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    data-name="vs/editor/editor.main"
                    href="https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css"
                />
            </Head>


        <AdminEditCustomPageStyledDiv className='page-container'>
            <p>Page Name (without Space):</p>
            <input name='pageName' placeholder='page name' value={state.pageName} onChange={e => onChangeHandler(e)}/>
            <p>Sidebar:</p>
            <select name='sidebar'
                    onChange={e => onChangeHandler(e)}
                // @ts-ignore
                    value={state.sidebar}
            >
                <option value='left'>Left</option>
                <option value='right'>Right</option>
                <option value='both'>Both</option>
                <option value='false'>No</option>
            </select>
            <p>status:</p>
            <select name='status' onChange={e => onChangeHandler(e)} value={state.status}>
                <option value='publish'>Publish</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
            </select>
            <Editor
                language='scss'
                width={props.width || '100%'}
                height={props.height || '80vh'}
                theme="vs-dark"
                defaultValue={state.pageStyle || ''}
                value={state.pageStyle || ''}
                // @ts-ignore
                onChange={onStyleChangeHandler}
                //className='style-section-editor'
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
