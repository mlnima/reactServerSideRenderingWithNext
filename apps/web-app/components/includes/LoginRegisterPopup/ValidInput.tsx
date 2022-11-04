import React, {FC} from 'react';
import styled from "styled-components";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";

const ValidInputStyledDiv = styled.div`
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`

interface ValidInputPropTypes {
    valid: boolean | undefined
}

const ValidInput: FC<ValidInputPropTypes> = ({valid}) => {
    return (
        <ValidInputStyledDiv className='validator'> {
            valid ?
                <SvgRenderer svgUrl={'/asset/images/icons/check-solid.svg'}
                             size={25}
                             color={'green'}/> :
                <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                             size={25}
                             color={'red'}/>
        }</ValidInputStyledDiv>
    );
};
export default ValidInput;