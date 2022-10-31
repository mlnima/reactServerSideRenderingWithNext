import styled from "styled-components";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

const PriceStyledDiv = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  color: var(--post-page-info-color, #ccc);
  .price-info-logo {
    width: 24px;
    height: 24px;
    color: var(--post-page-info-color, #ccc);
  }
`

const Price = ({currency, price}) => {
    return (
        <PriceStyledDiv className='price-information'>
            {currency === 'Usd'?
            <SvgRenderer svgUrl={'/asset/images/icons/dollar-sign-solid.svg'}
                         size={25}
                         customClassName={'price-info-logo'}
                         color={'var(--primary-button-link-text-color, #000)'}/>:
                <SvgRenderer svgUrl={'/asset/images/icons/euro-sign-solid.svg'}
                             size={25}
                             customClassName={'price-info-logo'}
                             color={'var(--primary-button-link-text-color, #000)'}/>
            }

            <p>{price}</p>
        </PriceStyledDiv>
    )
};

export default Price;
