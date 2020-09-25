import React, {useEffect, useState, useContext, useRef} from 'react';

const FormToolBar = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);


    const onAddNewFieldToFormHandler = e => {
           props.setFields([
               ...props.fields,
               {type:e.target.name}
           ])
    }


    return (
        <div className='form-tool-bar'>
            <button name='staticText' onClick={e=>onAddNewFieldToFormHandler(e)}>Static Text</button>
            <button name='Static Image' onClick={e=>onAddNewFieldToFormHandler(e)}>Static Image</button>
            <button name='textInputField' onClick={e=>onAddNewFieldToFormHandler(e)}>Text Input</button>
            <button name='textAreaField' onClick={e=>onAddNewFieldToFormHandler(e)}>Text Area</button>
            <button name='dropDown' onClick={e=>onAddNewFieldToFormHandler(e)}>Drop Down</button>
            <button name='radioButton' onClick={e=>onAddNewFieldToFormHandler(e)}>Radio Button</button>
            <button name='checkbox' onClick={e=>onAddNewFieldToFormHandler(e)}>Check Box</button>
        </div>
    );
};
export default FormToolBar;
