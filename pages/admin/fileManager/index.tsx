import React, { useEffect, useState } from 'react';
import FileManagerControl from '../../../components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl'
import FileManagerArea from '../../../components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea';
import { readPath } from '../../../_variables/_ajaxFilesVariables'
import withRouter from 'next/dist/client/with-router'
import UploadedPopView from '../../../components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView'
import CreateNewFileFolderPop from "../../../components/adminIncludes/FileManagerComponents/CreateNewFileFolderPop/CreateNewFileFolderPop";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/clientActions/globalStateActions";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const fileManager = () => {
    const dispatch = useDispatch()

    const [ state, setState ] = useState({
        path: '.',
        prevPath: '.',
        files: [],
        clickedItem: '',
        clickedItemName: '',
        file: '',
        editFile: false,
        action: '',
        _do: '',
        // AlertBox:false,
        DeleteAlertBox: false,
        confirm: Date.now(),
        message: '',
        report: '',
        inputBox: false,
        newItemName: '',
        lastUpdate:Date.now(),
        createNewFileFolderPop:false,
        createNewFileFolderPopType:'file'
    });

    useEffect(() => {
        setData()
    }, [ state.path,state.lastUpdate ]);

    const setData = () => {
        dispatch(setLoading(true))
        readPath(state.path).then(res => {
            // @ts-ignore
            if (res.data.type === 'dir') {
                setState({
                    ...state,
                    // @ts-ignore
                    files: res.data.data,
                })
                dispatch(setLoading(false))
                // @ts-ignore
            } else if (res.data.type === 'file') {

                setState({
                    ...state,
                    clickedItem: state.path,
                    path:state.prevPath,
                    // @ts-ignore
                    file:res.data.data
                })
                dispatch(setLoading(false))
            } else {
                setState({
                    ...state,
                    // @ts-ignore
                    error: true
                })
                dispatch(setLoading(false))
            }
        }).catch(err => {
            dispatch(setLoading(false))
        })
    }
    // @ts-ignore
    const setStateHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    return (
        <>
            <UploadedPopView clickedItem={ state.clickedItem } setStateHandler={ setStateHandler } state={ state } setState={ setState }/>
            <div className='fileManager'>
                <FileManagerControl setStateHandler={ setStateHandler } data={ state } state={ state } setState={ setState }/>
                <FileManagerArea setStateHandler={ setStateHandler } data={ state } state={ state } setState={ setState }/>
            </div>
            <CreateNewFileFolderPop render={state.createNewFileFolderPop} createNewFileFolderPopType={state.createNewFileFolderPopType} state={ state } setState={ setState }/>
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
export default withRouter(fileManager);
