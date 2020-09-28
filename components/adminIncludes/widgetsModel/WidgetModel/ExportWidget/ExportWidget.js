import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

const ExportWidget = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {

    }, [props]);


    const onExportHandler = () => {

        const data = [{
            ...props.data,
        }]
        let filename = `${Date.now().toLocaleString()}-widget.json`;
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
        <button onClick={() => onExportHandler()}>Export</button>
    );
};
export default ExportWidget;
