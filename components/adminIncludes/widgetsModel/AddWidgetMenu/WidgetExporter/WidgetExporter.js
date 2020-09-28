import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

const WidgetExporter = props => {
    const contextData = useContext(AppContext);

    const [state, setState] = useState({});
    useEffect(() => {
    }, []);


    const exportAllWidgets=()=>{

        const data = contextData.widgetsSettings.widgets.map(widget=>{
            widget.data.posts =[]
            widget.data.metaData =[]
            widget.data.comments =[]
            return widget.data
        })

        let filename = `${Date.now().toLocaleString()}-all-widgets.json`;
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
            navigator.msSaveOrOpenBlob(blob, filename);
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }
    }


    return (
        <div className='AddWidgetWithPositionMenu'>
            <button className='positionsOpener' onClick={()=>exportAllWidgets()}>Export All Widgets</button>
        </div>
    );
};
export default WidgetExporter;
