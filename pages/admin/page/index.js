import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import {saveNewPage, getPageData, updatePage} from "../../../_variables/ajaxVariables";
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";

const page = props => {
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
            getPageData({id: router.query.id}, window.location.origin).then(res => {
                if (res.data.pageData) {
                    setState({
                        ...state,
                        ...res.data.pageData
                    })
                }
                console.log(res.data.pageData)
            })
        }

    }, [props]);


    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(state)
    }, [state]);

    const onStyleChangeHandler = value => {
        setState({
            ...state,
            pageStyle: value
        })
    }

    const onSaveHandler = () => {
        if (router.query.id) {
            console.log('update')
            updatePage({pageData: state}).then(res => {
                console.log(res.data)
            })
        } else {
            saveNewPage({pageData: {...state, pageName: state.pageName.replace(' ', '')}}).then(res => {
                const pageId = res.data.savedPageData._id
                router.push(`/admin/page?id=${pageId}`)

            })
        }

    }

    return (

        <div className='page-container'>
            <p>Page Name (without Space):</p>
            <input name='pageName' placeholder='page name' value={state.pageName} onChange={e => onChangeHandler(e)}/>
            <p>Sidebar:</p>
            <select name='sidebar' onChange={e => onChangeHandler(e)} value={state.sidebar}>
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
                onChange={onStyleChangeHandler}
                //className='style-section-editor'
            />
            <button onClick={onSaveHandler}>Save</button>
        </div>


    );
};

export default page;
