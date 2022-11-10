import React, {useEffect, useState, useRef} from 'react';
import {fetchAdminPanelAddNewWidget} from "@store_toolkit/adminReducers/adminWidgetsReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";

const WidgetImporter = () => {
    const inputFile = useRef(null)
    const dispatch = useAdminDispatch()
    // const [widgets,setWidgets] = useState([])

    // useEffect( () => {
    //     onWidgetImportHandler()
    // }, [widgets]);

    // const onWidgetImportHandler = async ()=>{
    //     if (widgets?.length){
    //         for await (let widget of widgets){
    //             dispatch(fetchAdminPanelAddNewWidget(widget))
    //         }
    //     }
    // }

    const onLoadHandler = async (e)=>{
        try {
            //@ts-ignore
            const widgets = JSON.parse(e.target.result)
            for await (let widget of widgets){
                dispatch(fetchAdminPanelAddNewWidget(widget))
            }
        }catch (error){

        }
    }

    return (
        <div className='import-widgets'>
            <input ref={inputFile} style={{display:'none'}} type='file' onChange={async e => {
                const reader = new FileReader()
                reader.readAsText(e.target.files[0])
                reader.onload = async (e) => onLoadHandler(e)
            }}/>
            <button className='btn btn-primary' onClick={()=>inputFile.current.click()}>
                Import Widget
            </button>
        </div>
    );
};
export default WidgetImporter;
