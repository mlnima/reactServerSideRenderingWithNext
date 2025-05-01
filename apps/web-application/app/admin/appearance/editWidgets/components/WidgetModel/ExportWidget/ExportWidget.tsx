'use client';
import {loading} from "@store/reducers/globalStateReducer";
import {IWidgetData} from "@repo/typescript-types";
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {useAppDispatch} from "@store/hooks";

interface PropTypes{
    widgetData:IWidgetData
}
const ExportWidget:FC<PropTypes> = ({widgetData}) => {
    const dispatch = useAppDispatch()
    const onExportHandler = () => {
        const data = [widgetData]

        let filename = `${performance.now().toLocaleString()}-widget.json`;
        let contentType = "application/json;charset=utf-8;";

        if (window.navigator  && (window.navigator as any).msSaveOrOpenBlob) {

            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
            (window.navigator as any).msSaveOrOpenBlob(blob, filename);
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
        <button className={'btn btn-primary'} title="export" onClick={() => onExportHandler()}>
            <FontAwesomeIcon icon={faFileExport} className={'meta-icon'}/>
        </button>
    );
};
export default ExportWidget;
