import React,{useContext,useState} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import './ShoppingCart.scss';
import {AppContext} from "../../../../context/AppContext";

const ShoppingCart = props => {
    const contextData = useContext(AppContext);
    const [state,setState] = useState({
        svgDefaultStyle:{
            maxWidth:'25px',
            maxHeight: '25px'
        }
    })
    return (
            <Link href='/checkout'>
                <a className='shopping-card-link' aria-label='shopping-card-link'>
                    <FontAwesomeIcon style={state.svgDefaultStyle} icon={faShoppingCart} className='shopping-card-logo svg-logo-medium' />
                    <p className='shopping-card-number'>{contextData.checkOutData.items.length }</p>
                </a>
            </Link>
    );
};
export default ShoppingCart;
