import {FC} from "react";

interface ComponentPropTypes {
    type: string,
    name: string,
    required?: boolean,
    className?: string,
    value: any,
    title: string,
    onChangeHandler: any,
}

const TextInput: FC<ComponentPropTypes> =
    ({
         type,
         name,
         required,
         value,
         title,
         onChangeHandler,
         className
     }) => {

        return (
            <>
                <p>{title}</p>
                {type === 'textarea' ?
                    <textarea name={name}
                              value={value}
                              onChange={e => onChangeHandler(e)}
                              className={`form-control-input ${className || ''}`}
                              required={required || false}
                    /> :
                    <input name={name}
                           type={type}
                           value={value}
                           onChange={e => onChangeHandler(e)}
                           className={`form-control-input ${className || ''}`}
                           required={required || false}
                    />
                }
            </>
        )

    };
export default TextInput
