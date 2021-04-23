import {useEffect, useState} from 'react';
import {Document, Page, pdfjs} from "react-pdf";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const MediaDocumentWidget = props => {
    const [state, setState] = useState({
        maxPage: 0,
        activePage: 1
    });

    const onDocumentLoad = ({numPages}) => {
        setState({
            ...state,
            maxPage: numPages
        })
    }
    useEffect(() => {
             pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [props]);

    const PagesController = () => {

        if (state.maxPage > 1) {
            return (
                <div className='page-controller'>
                    <button onClick={() => {
                        setState({
                            ...state,
                            activePage: (state.activePage - 1) <1 ? 1 :state.activePage - 1
                        })
                    }}><FontAwesomeIcon icon={faArrowLeft} className='svg-logo-small'/>
                    </button>
                    <button onClick={() => {
                        setState({
                            ...state,
                            activePage: (state.activePage + 1)>state.maxPage ? state.maxPage :state.activePage + 1
                        })
                    }}><FontAwesomeIcon icon={faArrowRight} className='svg-logo-small'/>
                    </button>
                </div>
            )
        } else return null
    }

    const documentWidth = window.innerWidth > 768 ? 760 : window.innerWidth
    return (
        <>
            <Document className='widget-document-type' file={props.mediaUrl} onLoadError={console.error} onLoadSuccess={onDocumentLoad}>
                <Page pageNumber={state.activePage || 1} width={documentWidth}/>
            </Document>
            <PagesController/>
        </>
    );
};
export default MediaDocumentWidget;
