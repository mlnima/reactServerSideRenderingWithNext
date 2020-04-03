import React, { useEffect, useState, useContext,useRef } from 'react';
import { AppContext } from '../../../../../context/AppContext'

const ViewsLikesDisLikes = props => {
    const contextData = useContext(AppContext);
    const valueInput = useRef(null)
    const [ state, setState ] = useState({});
    useEffect(() => {
       console.log(  props)
        if (valueInput.current){
            valueInput.current.value= contextData.editingPostData[props.name]
        }

    }, [props]);

    const onChangeHandler =e=>{
        contextData.dispatchEditingPostData(editingPostData=>({
            ...editingPostData,
            [e.target.name]:e.target.value
        }))
    }

    return (
        <div className='ViewsLikesDisLikes VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input ref={valueInput} type='number' name={ props.name } className='numberInput'   onChange={ e => onChangeHandler(e) }/>
            </div>
        </div>
    );
};
export default ViewsLikesDisLikes;