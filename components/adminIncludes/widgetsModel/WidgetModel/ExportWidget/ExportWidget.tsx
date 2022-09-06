import {useAdminDispatch} from "@store_toolkit/hooks";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const ExportWidget = props => {
    const dispatch = useAdminDispatch()
    const onExportHandler = () => {
        const data = [{
            ...props.data,
        }]

        let filename = `${Date.now().toLocaleString()}-widget.json`;
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
            <SvgRenderer svgUrl={'/public/asset/images/icons/file-export-solid.svg'}
                         size={20}
                         color={'var(--primary-button-link-text-color, #000)'}/>
        </button>
    );
};
export default ExportWidget;