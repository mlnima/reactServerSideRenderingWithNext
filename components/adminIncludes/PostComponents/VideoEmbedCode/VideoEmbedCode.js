import React,{useEffect,useState,useContext} from 'react';
import './VideoEmbedCode.scss';
import { AppContext } from "../../../../context/AppContext";

const VideoEmbedCode = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);

        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <textarea className='textareaInput'/>
                </div>
            </div>
        );


};
export default VideoEmbedCode;