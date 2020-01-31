import React,{useEffect,useState,useContext} from 'react';
import './VideoUrls.scss';

const VideoUrls = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='VideoUrls VideoInformationSection'>
            <div className="title">
                <p>Video URL</p>
            </div>
            <div className="editor">
                <input className='textInput'/>
            </div>
        </div>
    );
};
export default VideoUrls;