import React,{useEffect,useState,useContext} from 'react';
import { AppContext } from "../../../../../context/AppContext";
const ImagePreview = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='ImagePreview VideoInformationSection'>
            <div className="title">
                <p>Image Preview</p>
            </div>
            <div className="editor">
                <img src={contextData.editingPostData.mainThumbnail}/>
                {/*<textarea ref={element} className='textareaInput' name={ props.name } onChange={e=>props.onChangeHandler(e)}/>*/}
            </div>
        </div>
    );
};
export default ImagePreview;