import {FC,ChangeEvent} from "react";

interface PropTypes {
    onChangeHandler:any
}

const AdMode: FC<PropTypes> = ({onChangeHandler}) => {
    return (
        //@ts-ignore
        <div onChange={onChangeHandler}>
            <input type='radio' name={'AdMode'} value={'offer'}/> I Offer
            <input type='radio' name={'AdMode'} value={'request'}/> I'm looking for
        </div>
    )
};
export default AdMode
