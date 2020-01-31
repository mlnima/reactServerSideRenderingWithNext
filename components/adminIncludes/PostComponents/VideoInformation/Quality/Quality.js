import React,{useEffect,useState,useContext} from 'react';
const Quality = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='Quality VideoInformationSection'>
            <div className="title">
                <p>Quality</p>
            </div>
            <div className="editor">
                <div className="option">
                    <p>240p</p>
                    <input type='checkbox'/>
                </div>
            </div>
        </div>
    );
};
export default Quality;