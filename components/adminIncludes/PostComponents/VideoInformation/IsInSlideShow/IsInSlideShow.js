import React,{useEffect,useState,useContext} from 'react';
const IsInSlideShow = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='IsInSlideShow VideoInformationSection'>
            <div className="title">
                <p>Slide Show</p>
            </div>
            <div className="editor">
                <input type='checkbox'/>
            </div>
        </div>
    );
};
export default IsInSlideShow;