import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

const ExportWidget = props => {
    const dispatch = useAppDispatch()
    const onExportHandler = () => {
        const data = [{
            ...props.data,
        }]
        let filename = `${Date.now().toLocaleString()}-widget.json`;
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
        <button className={'btn btn-primary'} title="export" onClick={() => onExportHandler()}><FontAwesomeIcon icon={faFileExport} style={{width:'15px',height:'15px'}}/></button>
    );
};
export default ExportWidget;
