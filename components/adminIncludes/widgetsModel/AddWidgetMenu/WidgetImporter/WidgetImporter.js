import React, {useEffect, useState, useContext, useRef} from 'react';
import {addNewWidget, getMultipleWidgetWithData} from "../../../../../_variables/ajaxVariables";
import {AppContext} from "../../../../../context/AppContext";

const WidgetImporter = () => {
    const inputFile = useRef(null)
    const contextData = useContext(AppContext);
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
                }).then(() => {
                    getMultipleWidgetWithData({ widgets: [ 'all' ] }, window.location.origin,false,  Date.now()).then(res=>{
                        contextData.dispatchWidgetsSettings({
                            ...contextData.widgetsSettings,
                            widgets: [ ...res.data.widgets ]
                        })
                    })
                }).catch(err=>{
                    console.log( err)
                })
            }
        }

    }
    return (
        <div className='AddWidgetWithPositionMenu'>
            <input ref={inputFile} style={{display:'none'}} type='file' onChange={async e => {
                const reader = new FileReader()
                reader.readAsText(e.target.files[0])
                reader.onload = e => {
                    setState({...state, data: JSON.parse(e.target.result)})
                }
            }}/>
            <button className='positionsOpener' onClick={()=>inputFile.current.click()}>Import Widget</button>
        </div>
    );
};
export default WidgetImporter;
