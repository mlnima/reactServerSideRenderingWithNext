import React, {FC} from 'react';

interface TextInputFieldForWidgetPropTypes {
    name: string,
    type: string,
    value: string | number | readonly string[],
    onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>,
    inputTitle?: string,
    placeHolder?: string,
    classNameValue?: string,
}

const TextInputFieldForWidget: FC<TextInputFieldForWidgetPropTypes> =
    ({
         name,
         inputTitle,
         type,
         value,
         placeHolder,
         onChangeHandler,
         classNameValue
     }) => {
        return (
            <div className={`TextInputFieldForWidget ${classNameValue || ''}`}>
                {inputTitle && <p>{inputTitle}</p>}
                <input name={name} type={type} value={value} placeholder={placeHolder}
                       className={'form-control-input'} onChange={onChangeHandler}/>
            </div>
        )
    };
export default TextInputFieldForWidget;
