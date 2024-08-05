import React, { useEffect, useState } from 'react';
import FileManagerControl from './FileManagerControl/FileManagerControl'
import FileManagerArea from './FileManagerArea/FileManagerArea';
import UploadedPopView from './UploadedPopView/UploadedPopView'
import CreateNewFileFolderPop from "./CreateNewFileFolderPop/CreateNewFileFolderPop";
import {useSelector} from "react-redux";
import {DashboardStore, Store} from "@repo/typescript-types";
import {readThePathAction} from "@store/reducers/fileManagerReducer";
import {useAppDispatch} from "@store/hooks";

const FileManager = () => {
    const dispatch = useAppDispatch()
    const fileManagerData = useSelector(({fileManager}:DashboardStore)=>fileManager)

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
        dispatch(readThePathAction({path:fileManagerData.path, prevPath:fileManagerData.prevPath}))
    }
    
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

export default FileManager;
