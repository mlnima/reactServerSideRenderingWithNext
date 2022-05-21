import React from 'react';
import { useSelector} from "react-redux";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

const WidgetExporter = () => {
    const widgets = useSelector(store => store?.widgets.widgets)
    const dispatch = useAppDispatch()

    const exportAllWidgets=()=>{
        const data = widgets.map(widget=>{
            widget.data.uniqueData.posts =[]
            widget.data.uniqueData.metaData =[]
            widget.data.comments =[]
            return widget.data
        })

        let filename = `${Date.now().toLocaleString()}-all-widgets.json`;
        let contentType = "application/json;charset=utf-8;";

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
            navigator.msSaveOrOpenBlob(blob, filename);

            dispatch(loading(false))
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            dispatch(loading(false))
        }
    }

    return (
        <div className='export-widgets'>
            <button className='btn btn-primary' onClick={()=>exportAllWidgets()}>Export All Widgets</button>
        </div>
    );
};
export default WidgetExporter;
