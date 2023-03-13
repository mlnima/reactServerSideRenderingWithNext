import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

let StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .close-checkout-slide-button {
    border: none;
    background-color: transparent;
    top: 20px;
    right: 20px;
  }
`

const CheckOutSlideHeader = () => {

    const onCloseCheckoutSlideHandler = () => {

    }
    return (
        <StyledDiv className='checkout-slide-header'>
            <button className='close-checkout-slide-button' onClick={onCloseCheckoutSlideHandler}>
                <FontAwesomeIcon className={'navigation-mobile-button-logo'} icon={faXmark} style={{width:25,height:25}}/>
            </button>
        </StyledDiv>
    );
};
export default CheckOutSlideHeader;
