import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faDollar} from "@fortawesome/free-solid-svg-icons/faDollar";
import {faEuroSign} from "@fortawesome/free-solid-svg-icons/faEuroSign";

const PriceStyledDiv = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  color: var(--secondary-text-color, #ccc);

  .price-info-logo {
    width: 24px;
    height: 24px;
    color: var(--secondary-text-color, #ccc);
  }
`

const Price = ({currency, price}) => {
    return (
        <PriceStyledDiv className='price-information'>
            {currency === 'Usd' ?
                <FontAwesomeIcon className={'price-info-logo'}
                                 icon={faDollar}
                                 color={'var(--primary-button-link-text-color, #000)'}
                                 style={{width: 25, height: 25}}/> :
                <FontAwesomeIcon className={'price-info-logo'}
                                 color={'var(--primary-button-link-text-color, #000)'}
                                 icon={faEuroSign} style={{width: 25, height: 25}}/>
            }
            <p>{price}</p>
        </PriceStyledDiv>
    )
};

export default Price;
