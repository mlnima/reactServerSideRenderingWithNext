import React,{useContext} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import './ShoppingCart.scss';
import {AppContext} from "../../../../context/AppContext";

const ShoppingCart = props => {
    const contextData = useContext(AppContext);
    return (
            <Link href='/checkout'>
                <a className='shopping-card-link'>
                    <FontAwesomeIcon icon={faShoppingCart} className='shopping-card-logo svg-logo-medium' />
                    <p className='shopping-card-number'>{contextData.checkOutData.items.length }</p>
                </a>
            </Link>
    );
};
export default ShoppingCart;
