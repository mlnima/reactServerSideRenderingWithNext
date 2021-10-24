import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  .close-checkout-slide-button{
    border: none;
    background-color: transparent;
    top: 20px;
    right: 20px;
    svg{
      width: 25px;
      height: 25px;
    }
  }
`

const CheckOutSlideHeader = props => {

    const onCloseCheckoutSlideHandler = ()=>{
        // contextData.dispatchState({
        //     ...contextData.state,
        //     checkoutSlideEnable:false
        // })
    }
    return (
        <StyledDiv className='checkout-slide-header'>
            <button className='close-checkout-slide-button' onClick={onCloseCheckoutSlideHandler}> <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo'/></button>
        </StyledDiv>
    );
};
export default CheckOutSlideHeader;
