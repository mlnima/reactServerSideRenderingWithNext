import {useEffect, useState} from 'react';
import {saveNewPage, getPageData, updatePage} from "../../../_variables/ajaxVariables";
import {useRouter} from 'next/router'
import Editor from "@monaco-editor/react";
import styled from "styled-components";
let StyledDiv = styled.div`
  input{
    background-color: white;
    width: 90%;
  }
`

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
            getPageData({id: router.query.id}).then(res => {
                if (res.data.pageData) {
                    setState({
                        ...state,
                        ...res.data.pageData
                    })
                }

            })
        }

    }, [props]);


    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }



    const onStyleChangeHandler = value => {
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
                const pageId = res.data.savedPageData._id
                router.push(`/admin/page?id=${pageId}`)

            })
        }

    }

    return (

        <StyledDiv className='page-container'>
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
        </StyledDiv>


    );
};

export default page;
