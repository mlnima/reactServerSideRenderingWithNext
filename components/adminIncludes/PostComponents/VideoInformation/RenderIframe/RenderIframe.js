import React,{useEffect,useState,useContext} from 'react';
import { AppContext } from "../../../../../context/AppContext";
const RenderIframe = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    if (contextData.editingPostData.videoEmbedCode){
        return (

            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Iframe Preview</p>
                </div>
                <div className="editor">
                        <iframe src={contextData.editingPostData.videoEmbedCode}/>
                </div>
            </div>

        );
    }else return null

};
export default RenderIframe;