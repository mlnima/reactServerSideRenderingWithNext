// @ts-nocheck
import React from 'react';
import {useSelector} from "react-redux";
import {loading} from "@store/reducers/globalStateReducer";
import {DashboardStore, Store} from "@repo/typescript-types";
import {useAppDispatch} from "@store/hooks";

const WidgetExporter = () => {
    const widgets = useSelector(({widgets}: DashboardStore) => widgets?.adminPanelWidgets)
    const dispatch = useAppDispatch()

    const exportAllWidgets = () => {
//[position,widgetsOnPosition]
        const data = Object.entries(widgets).reduce((finalArr,current)=>{
            const [position,widgetsOnPosition] = current
            finalArr = [...finalArr,...widgetsOnPosition]
            return finalArr
        },[])
        // const data = widgets.map(widget => {
        //     widget.data.uniqueData.posts = []
        //     widget.data.uniqueData.metaData = []
        //     //@ts-ignore
        //     widget.data.comments = []
        //     return widget.data
        // })

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
