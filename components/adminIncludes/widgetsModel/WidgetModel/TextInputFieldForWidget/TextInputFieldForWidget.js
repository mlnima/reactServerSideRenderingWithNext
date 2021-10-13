import React from 'react';


const TextInputFieldForWidget = props => {

    if (props.rendering){
        return (
            <div className='TextInputFieldForWidget widgetSection'>
                <p>{props.inputTitle}</p>
                <input name={props.name}  type={props.type} value={props.value} placeholder={props.placeHolder}
                       className={props.classNameValue + ' form-widget-field'}  onChange={e => props.onChangeHandler(e)}/>
            </div>
        )
    }else return null


};
export default TextInputFieldForWidget;
