import {FC} from "react";

interface IProps {
    name?: string;
    className?: string
    onChangeHandler: Function
}

const LanguagesSelectBox: FC<IProps> = ({name, className, onChangeHandler}) => {

    const selectOptions = {
        ...(name ? {name} : {}),
    }

    const languagesOptions = (process?.env?.NEXT_PUBLIC_LOCALS || '').split(" ").map((lang: string, index: number) => {
        return (
            //@ts-ignore
            <option key={lang + index}
                    value={lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? 'default' : lang}>
                {lang}
            </option>
        );
    });

    return (
        //@ts-ignore
        <select {...selectOptions} onChange={event =>onChangeHandler(event)} className={`custom-select ${className || ''}`}>
            {languagesOptions}
        </select>
    )
};

export default LanguagesSelectBox
