import {FC} from "react";

interface InputPropTypes {
    name: string,
    placeHolder: string,
    value: string,
    type?: string,
    className: string,
    onChangeHandler: any
}

const Input: FC<InputPropTypes> = ({
                                       name,
                                       type,
                                       className,
                                       onChangeHandler,
                                       value,
                                       placeHolder
                                   }) => {
    return (
        <input type={type}
               name={name}
               className={className + ' form-control-input'}
               value={value}
               placeholder={placeHolder}
               onChange={e => onChangeHandler(e)}
        />
    )
};
export default Input
