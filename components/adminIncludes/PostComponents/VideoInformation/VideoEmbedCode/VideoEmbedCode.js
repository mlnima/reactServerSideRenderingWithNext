import React,{useEffect,useState,useContext,useRef} from 'react';
import './VideoEmbedCode.scss';
import { AppContext } from "../../../../../context/AppContext";

const VideoEmbedCode = props => {
    const contextData = useContext(AppContext);
    const element = useRef(null);

    const [state, setState] = useState({
    });

    useEffect(()=>{
        if (element.current){
            if (contextData.editingPostData[element.current.name]){
                element.current.value = contextData.editingPostData[element.current.name]
            }
        }
    },[ contextData.editingPostData]);

        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <div className="title">
                    <p>Video Embed Code</p>
                </div>
                <div className="editor">
                    <textarea ref={element} className='textareaInput' name={ props.name } onChange={e=>props.onChangeHandler(e)}/>
                </div>
            </div>
        );


};
export default VideoEmbedCode;