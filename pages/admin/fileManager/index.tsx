import React, { useEffect, useState } from 'react';
import FileManagerControl from '@components/adminIncludes/FileManagerComponents/FileManagerControl/FileManagerControl'
import FileManagerArea from '@components/adminIncludes/FileManagerComponents/FileManagerArea/FileManagerArea';
// import { readPath } from '@_variables/_ajaxFilesVariables'
import withRouter from 'next/dist/client/with-router'
import UploadedPopView from '@components/adminIncludes/FileManagerComponents/UploadedPopView/UploadedPopView'
import CreateNewFileFolderPop from "../../../components/adminIncludes/FileManagerComponents/CreateNewFileFolderPop/CreateNewFileFolderPop";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {adminPanelFileManagerReadPath} from "@store/adminActions/adminPanelFileManagerActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const fileManager = () => {
    const dispatch = useDispatch()
    const fileManagerData = useSelector(({adminPanelFileManager}:StoreTypes)=>adminPanelFileManager)

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
    }, [ fileManagerData.path,fileManagerData.lastUpdate ]);

    const setData = () => {
        dispatch(adminPanelFileManagerReadPath(fileManagerData.path,fileManagerData.prevPath))
    }

    // // @ts-ignore
    // const setStateHandler = (key, value) => {
    //     setState({
    //         ...state,
    //         [key]: value
    //     })
    // }

    return (
        <>
            <UploadedPopView/>
            <div className='fileManager'>
                <FileManagerControl />
                <FileManagerArea />
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
