import {FC} from "react";
import styled from "styled-components";

interface PropTypes {
    onChangeHandler: any
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
  div{
    display: flex;
    align-items: center;
    gap:8px;
.name{
  width: 80%;
}
  }
`

const PersonalInfo: FC<PropTypes> = ({onChangeHandler}) => {
    return (
        <Style>
            <div onChange={onChangeHandler} className={'field-section'}>
                <p>Provider Type</p>
                <input type='radio' name={'AdMode'} value={'private'}/> Private
                <input type='radio' name={'AdMode'} value={'commercial'}/> Commercial
            </div>
            <div className={'field-section'}>
                <p>Name</p>
                <input type={'text'} name={'name'} className={'primaryInput name'} onChange={onChangeHandler}/>
            </div>
        </Style>
    )
};
export default PersonalInfo
