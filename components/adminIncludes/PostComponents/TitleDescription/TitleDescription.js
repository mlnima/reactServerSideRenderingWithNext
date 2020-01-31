import React,{useEffect,useState,useContext} from 'react';
import './TitleDescription.scss'
import { AppContext } from "../../../../context/AppContext";
const TitleDescription = props => {


    const [state, setState] = useState({
    });


    useEffect(()=>{
        console.log( props)
    },[ ]);

    return (
        <div className='TitleDescription'>
            <input name='title' className='TitleDescriptionTitle' placeholder='Enter The Title Here' onChange={e=>props.onChangeHandler(e)}/>
            <textarea name='description' className='TitleDescriptionDescription' onChange={e=>props.onChangeHandler(e)}/>
        </div>
    );
};
export default TitleDescription;