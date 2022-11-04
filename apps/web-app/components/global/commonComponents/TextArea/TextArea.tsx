import {FC} from "react";

interface InputPropTypes {
    name: string,
    placeHolder: string,
    value: string,
    className: string,
    onChangeHandler: any
}

const TextArea: FC<InputPropTypes> = ({
                                          name,
                                          className,
                                          onChangeHandler,
                                          value,
                                          placeHolder
                                      }) => {
    return (
        <textarea name={name}
                  className={className + ' form-control-input'}
                  value={value}
                  placeholder={placeHolder}
                  onChange={e => onChangeHandler(e)}
        />
    )
};
export default TextArea
