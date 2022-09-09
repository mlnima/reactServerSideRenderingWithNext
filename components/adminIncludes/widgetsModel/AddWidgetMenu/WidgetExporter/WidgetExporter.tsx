import React from 'react';
import {useSelector} from "react-redux";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const WidgetExporter = () => {
    const widgets = useSelector((store: Store) => store?.widgets.widgets)
    const dispatch = useAdminDispatch()

    const exportAllWidgets = () => {
        const data = widgets.map(widget => {
            widget.data.uniqueData.posts = []
            widget.data.uniqueData.metaData = []
            //@ts-ignore
            widget.data.comments = []
            return widget.data
        })

        let filename = `${Date.now().toLocaleString()}-all-widgets.json`;
        let contentType = "application/json;charset=utf-8;";
        //@ts-ignore
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
            //@ts-ignore
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
            <button className='btn btn-primary' onClick={() => exportAllWidgets()}>Export All Widgets</button>
        </div>
    );
};
export default WidgetExporter;
