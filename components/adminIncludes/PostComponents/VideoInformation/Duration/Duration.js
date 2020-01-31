import React,{useEffect,useState,useContext} from 'react';
const Duration = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='Duration VideoInformationSection'>
            <div className="title">
                <p>Duration</p>
            </div>
            <div className="editor">
                <input className='textInput'/>
            </div>
        </div>
    );
};
export default Duration;