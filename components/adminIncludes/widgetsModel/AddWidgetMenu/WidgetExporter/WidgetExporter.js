import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../../../store/clientActions/globalStateActions";

const WidgetExporter = () => {
    const widgets = useSelector(store => store?.widgets.widgets)
    const dispatch = useDispatch()

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
            dispatch(setLoading(false))
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='export-widgets'>
            <button className='btn btn-primary' onClick={()=>exportAllWidgets()}>Export All Widgets</button>
        </div>
    );
};
export default WidgetExporter;
