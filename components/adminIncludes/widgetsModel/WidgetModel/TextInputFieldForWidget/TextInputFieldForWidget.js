import React from 'react';


const TextInputFieldForWidget = props => {

    if (props.rendering){
        return (
            <>
                <p>{props.inputTitle}</p>
                <input name={props.name}  type={props.type} value={props.value} placeholder={props.placeHolder}
                       className={props.classNameValue}  onChange={e => props.onChangeHandler(e)}/>
            </>
        )
    }else return null


};
export default TextInputFieldForWidget;
