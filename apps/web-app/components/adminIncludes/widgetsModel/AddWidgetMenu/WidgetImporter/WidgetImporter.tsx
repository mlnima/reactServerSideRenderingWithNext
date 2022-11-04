import React, {useEffect, useState, useRef} from 'react';
import {fetchAdminPanelAddNewWidget} from "../../../../../store_toolkit/adminReducers/adminWidgetsReducer";

const WidgetImporter = () => {
    const inputFile = useRef(null)
    const [state, setState] = useState({
        data:[]
    });

    const [widgets,setWidgets] = useState([])

    useEffect( () => {
        //@ts-ignore
        onWidgetImportHandler()
    }, [state.data]);

    const onWidgetImportHandler = async ()=>{
        if (state?.data?.length){
            for await (let widget of widgets){
                fetchAdminPanelAddNewWidget(widget)
            }
        }
    }

    return (
        <div className='import-widgets'>
            <input ref={inputFile} style={{display:'none'}} type='file' onChange={async e => {
                const reader = new FileReader()
                reader.readAsText(e.target.files[0])
                reader.onload = e => {
                    //@ts-ignore
                    setWidgets(JSON.parse(e.target.result))
                }
            }}/>
            <button className='btn btn-primary' onClick={()=>inputFile.current.click()}>
                Import Widget
            </button>
        </div>
    );
};
export default WidgetImporter;
