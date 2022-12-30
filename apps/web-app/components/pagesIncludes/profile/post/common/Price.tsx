import {FC} from "react";
import styled from "styled-components";

interface PropTypes {
    onChangeHandler:any
}


const Style = styled.div`
  div{
    display: flex;
    align-items: center;
    input,select{
      width: 20%;
    }
  }

`

const Price: FC<PropTypes> = ({onChangeHandler}) => {
    return (
        <Style>
            <div className={'field-section'}>
                <p>Price</p>
                <input type={'number'} name={'price'} className={'form-control-input'}/>
                <label >.00 EUR</label>
            </div>
            <div className={'field-section'}>
                <p>Price Type</p>
                <select className={'custom-select'} name={'priceType'} onChange={onChangeHandler}>
                    <option value={'fixed'}>Fixed Price</option>
                    <option value={'negotiable'}>Negotiable</option>
                    <option value={'free'}>Free</option>
                </select>
            </div>

        </Style>
    )
};
export default Price