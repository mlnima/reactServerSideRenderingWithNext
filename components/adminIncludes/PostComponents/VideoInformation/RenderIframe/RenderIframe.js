import React,{useEffect,useState,useContext,useRef} from 'react';
import { AppContext } from "../../../../../context/AppContext";
const RenderIframe = props => {
    const contextData = useContext(AppContext);
    const iframeElement = useRef(null)
    const [state, setState] = useState({
    });
    useEffect(()=>{
        if (iframeElement.current){
            iframeElement.current.src = contextData.editingPostData.videoEmbedCode
        }
    },[props]);
    if (contextData.editingPostData.videoEmbedCode){
        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Iframe Preview</p>
                </div>
                <div className="editor">
                        <iframe ref={iframeElement} />
                </div>
            </div>
        );
    }else return null

};
export default RenderIframe;