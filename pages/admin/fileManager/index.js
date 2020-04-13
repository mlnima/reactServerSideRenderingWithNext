import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import FileManagerControl from '../../../components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl'
import FileManagerArea from '../../../components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea';
import { readPath } from '../../../_variables/_ajaxFilesVariables'
import { AppContext } from '../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import UploadedPopView from '../../../components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView'

const fileManager = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        path: '.',
        files: [],
        clickedItem: '/static/uploads/image/2020/4/706185_561483320532764_1215505165_o.jpg',
        file: '',
        editFile: false,
        action: '',
        _do: '',
        // AlertBox:false,
        DeleteAlertBox: false,
        confirm: Date.now(),
        didDataChange: false,
        message: '',
        report: '',
        inputBox: false,
        newItemName: ''
    });



    useEffect(() => {
        setData()
    }, [ state.path, state.didDataChange ]);

    const setData = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        });
        readPath(state.path).then(res => {
            if (res.data.type === 'dir') {
                setState({
                    ...state,
                    files: res.data.data
                })
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                });
            } else if (res.data.type === 'file') {
                contextData.dispatchSettings({
                    ...contextData.settings,
                    textEditorCurrentFile: res.data.data
                })
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                });
                // props.router.push('/admin/fileManager/textEditor')
            } else {
                setState({
                    ...state,
                    error: true
                })
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                });
            }
        }).catch(err => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            });
        })
    }

    const setStateHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    return (
        <AdminLayout>
            <UploadedPopView clickedItem={state.clickedItem} setStateHandler={ setStateHandler } />
            <div className='fileManager'>
                <FileManagerControl setStateHandler={ setStateHandler } data={ state }/>
                <FileManagerArea setStateHandler={ setStateHandler } data={ state }/>
            </div>
        </AdminLayout>
    );
};
export default withRouter(fileManager);
