import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {AppContext} from "../../../../context/AppContext";
import {jsonExporter} from "../../../../_variables/_variables";
import {addNewWidget, getMultipleWidgetWithData} from "../../../../_variables/ajaxVariables";
import Editor from "@monaco-editor/react";

const customStyles = props => {
    const contextData = useContext(AppContext);
    const inputFile = useRef(null)
    const [state, setState] = useState({
        customStyles: '',
        data: null
    });

    useEffect(() => {
        if (contextData.siteDesign.customStyles) {
            setState({
                ...state,
                customStyles: contextData.siteDesign.customStyles
            })
        }
    }, [contextData.siteDesign]);

    useEffect(() => {
        // onImportHandler()
        if (state.data) {
            setState({
                ...state,
                customStyles: state.data
            })
        }
    }, [state.data]);

    // const onChangeHandler = (e) => {
    //     setState({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const onChangeHandler = value => {
        setState({
            ...state,
            customStyles: value
        })
    }

    const onSaveHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        contextData.functions.updateSetting('design', {...contextData.siteDesign, customStyles: state.customStyles}).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }).catch(err => {
            console.log(err)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }


    const onExportHandler = () => {
        const fileName = `${Date.now().toLocaleString()}-customDesign.scss`;
        jsonExporter({customStyle:state.customStyles}, fileName)
    }

    const onImportHandler =  () => {
        if (state.data) {
            setState({
                ...state,
                customStyles: state.data
            })
        }
    }





    return (
        <AdminLayout>
            <div className='custom-style-admin-page'>
                <Editor
                    language='scss'
                    width={props.width || '100%'}
                    height={props.height || '80vh'}
                    theme="vs-dark"
                    defaultValue={state.customStyles || ''}
                    value={state.customStyles || ''}
                    onChange={onChangeHandler}
                />
                {/*<textarea value={state.customStyles} name='customStyles' onChange={e => onChangeHandler(e)}/>*/}
                <button className='saveBtn' onClick={onSaveHandler}>Save</button>
                <button className='saveBtn' onClick={onExportHandler}>Export Custom Style</button>
                <input ref={inputFile} style={{display: 'none'}} type='file' onChange={async e => {
                    const reader = new FileReader()
                    reader.readAsText(e.target.files[0])
                    reader.onload = e => {
                        const loadedData = JSON.parse(e.target.result)
                        setState({...state, data: loadedData.customStyle})
                    }
                }}/>
                <button className='saveBtn' onClick={() => inputFile.current.click()}>Import Custom Style</button>
            </div>
        </AdminLayout>
    );
};
export default customStyles;
