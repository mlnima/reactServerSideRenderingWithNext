import React, {useContext} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";

const ShoppingCart = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);

    return (
        <Link
            href="/checkout"
            locale={router.locale || router.query.locale || false}
        >
            <a className='shopping-card-button'>
                <FontAwesomeIcon  icon={faShoppingCart} className='shopping-card-logo svg-logo-medium'/>
                <p className='shopping-card-number'>{contextData.checkOutData.items.length}</p>
            </a>
        </Link>
    );
};
export default ShoppingCart;
