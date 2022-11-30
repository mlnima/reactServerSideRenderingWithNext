import {FC} from "react";
import styled from "styled-components";

interface PropTypes {
    onChangeHandler:any
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  //gap:8px;
  div{
    display: flex;
    align-items: center;
    //gap:8px;
   
    .zip-code{
      width: 20%;
    }
    .location{
      width: 60%;
    }
    .street{
      width: 80%;
    }
  }
  .zip-area{

  }
`

const Location: FC<PropTypes> = ({onChangeHandler}) => {
    return (
        <Style>
            <h3>Location</h3>
            <div className={'field-section zip-area'}>
                <p>Zipcode</p>
                <input type={'number'} name={'zipCode'} className={'form-control-input zip-code'} onChange={onChangeHandler}/>
                <input type={'text'} name={'location'} className={'form-control-input location'} onChange={onChangeHandler}/>
            </div>
            <div className={'field-section'}>
                <p>Street, No. (optional)</p>
                <input type={'text'} name={'street'} className={'form-control-input street'} onChange={onChangeHandler}/>
            </div>
        </Style>
    )
};

export default Location
