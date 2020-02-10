import React,{useEffect,useState,useContext} from 'react';
import './TitleDescription.scss'
import { AppContext } from "../../../../context/AppContext";
const TitleDescription = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });


const onloadHandler = e =>{
      e.target.value=contextData.editingPostData[e.target.name]
};


    return (
        <div className='TitleDescription'>
            <input name='title'  value={contextData.editingPostData.title} className='TitleDescriptionTitle' placeholder='Enter The Title Here' onChange={e=>{contextData.functions.setEditingPostData(e.target.name,e.target.value)}}/>
            <textarea name='description' value={contextData.editingPostData.description} className='TitleDescriptionDescription' onChange={e=>{contextData.functions.setEditingPostData(e.target.name,e.target.value)}}/>
        </div>
    );
};
export default TitleDescription;