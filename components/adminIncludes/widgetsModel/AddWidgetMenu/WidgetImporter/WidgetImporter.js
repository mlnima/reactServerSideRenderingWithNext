import React, {useEffect, useState, useRef} from 'react';
import {addNewWidget} from "../../../../../_variables/ajaxVariables";


const WidgetImporter = () => {
    const inputFile = useRef(null)
    const [state, setState] = useState({
        data:[]
    });

    useEffect( () => {
        onWidgetImportHandler()
    }, [state.data]);

    const onWidgetImportHandler = async ()=>{
        if (state.data.length>0){
            for await (let widget of state.data){
                addNewWidget({
                    data:widget
                })
            }
        }

    }
    return (
        <div className='import-widgets'>
            <input ref={inputFile} style={{display:'none'}} type='file' onChange={async e => {
                const reader = new FileReader()
                reader.readAsText(e.target.files[0])
                reader.onload = e => {
                    setState({...state, data: JSON.parse(e.target.result)})
                }
            }}/>
            <button className='btn btn-primary' onClick={()=>inputFile.current.click()}>Import Widget</button>
        </div>
    );
};
export default WidgetImporter;
