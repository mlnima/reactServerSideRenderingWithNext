import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
            <FontAwesomeIcon icon={currency === 'Usd' ? faDollarSign : faEuroSign} className='price-info-logo'/>
            <p>{price}</p>
        </PriceStyledDiv>
    )
};
export default Price;
