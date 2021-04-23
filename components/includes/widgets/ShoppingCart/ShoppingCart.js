import React, {useContext} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledA = styled.a`
  position: relative;
  padding:  0 3px;
  text-decoration: none;
  border: none;
  background-color: transparent;

  .shopping-card-number{
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    top: 0;
    right: 0;
    border-radius: 30%;
    padding: 1px 2px;
  }
  svg{
    transition: .5s;
    margin: 0 5px;
    max-width: 25px;
    max-height: 25px;
    &:hover{
      transform: scale(1.2);
    }
  }
`
const ShoppingCart = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);

    return (
        <Link
            href="/checkout"
            locale={router.locale || router.query.locale || false}
        >
            <StyledA className='shopping-card-button'>
                <FontAwesomeIcon  icon={faShoppingCart} className='shopping-card-logo svg-logo-medium'/>
                <p className='shopping-card-number'>{contextData.checkOutData.items.length}</p>
            </StyledA>
        </Link>
    );
};
export default ShoppingCart;
