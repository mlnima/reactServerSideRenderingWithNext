import React, { useEffect, useState } from 'react';
import FileManagerControl from '../../../components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl'
import FileManagerArea from '../../../components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea';
import UploadedPopView from '../../../components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView'
import CreateNewFileFolderPop from "../../../components/adminIncludes/FileManagerComponents/CreateNewFileFolderPop/CreateNewFileFolderPop";
import {useSelector} from "react-redux";
import {fetchFilManagerReadPath} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";

const fileManager = () => {
    const dispatch = useAdminDispatch()
    const fileManagerData = useSelector(({adminPanelFileManager}:Store)=>adminPanelFileManager)

    const [ state, setState ] = useState({
        path: './public',
        prevPath: './public',
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
    }, [ fileManagerData.path,fileManagerData.lastUpdate ]);

    const setData = () => {
        dispatch(fetchFilManagerReadPath({path:fileManagerData.path, prevPath:fileManagerData.prevPath}))
    }

    // // @ts-ignore
    // const setStateHandler = (key, value) => {
    //     setState({
    //         ...state,
    //         [key]: value
    //     })
    // }

    return (
        <div>
            <UploadedPopView/>
            <div className='fileManager'>
                <FileManagerControl />
                <FileManagerArea />
            </div>
            <CreateNewFileFolderPop render={state.createNewFileFolderPop} createNewFileFolderPopType={state.createNewFileFolderPopType} state={ state } setState={ setState }/>
        </div>
    );
};

export default fileManager;
