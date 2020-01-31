import React,{useEffect,useState,useContext} from 'react';
const TextInputWithUploadBtn = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='TextInputWithUploadBtn VideoInformationSection'>
            <div className="title">
                <p>{props.name}</p>
            </div>
            <div className="editor">
                <input className='textInputWithUpload'/>
                <button className='uploadBtn'>Upload</button>
            </div>
        </div>
    );
};
export default TextInputWithUploadBtn;