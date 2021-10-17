import React from 'react';


const TextInputFieldForWidget = props => {
    return (
        <div className={'TextInputFieldForWidget'}>
            <p>{props.inputTitle}</p>
            <input name={props.name} type={props.type} value={props.value} placeholder={props.placeHolder}
                   className={'form-control-input'} onChange={e => props.onChangeHandler(e)}/>
        </div>
    )
};
export default TextInputFieldForWidget;
