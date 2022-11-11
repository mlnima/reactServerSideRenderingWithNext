import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

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

const CheckOutSlideHeader = props => {

    const onCloseCheckoutSlideHandler = () => {

    }
    return (
        <StyledDiv className='checkout-slide-header'>
            <button className='close-checkout-slide-button' onClick={onCloseCheckoutSlideHandler}>

                <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                             size={25}
                             customClassName={'navigation-mobile-button-logo'}
                             color={'var(--main-text-color, #fff)'}/>
            </button>
        </StyledDiv>
    );
};
export default CheckOutSlideHeader;
