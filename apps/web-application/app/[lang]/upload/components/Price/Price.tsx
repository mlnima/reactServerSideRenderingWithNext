import {FC} from "react";
import './Price.scss'

interface PropTypes {
    onChangeHandler:any
}

const Price: FC<PropTypes> = ({onChangeHandler}) => {
    return (
        <div className={'price'}>
            <div className={'field-section'}>
                <p>Price</p>
                <input type={'number'} name={'price'} className={'primaryInput'}/>
                <label >.00 EUR</label>
            </div>
            <div className={'field-section'}>
                <p>Price Type</p>
                <select className={'primarySelect'} name={'priceType'} onChange={onChangeHandler}>
                    <option value={'fixed'}>Fixed Price</option>
                    <option value={'negotiable'}>Negotiable</option>
                    <option value={'free'}>Free</option>
                </select>
            </div>

        </div>
    )
};
export default Price
