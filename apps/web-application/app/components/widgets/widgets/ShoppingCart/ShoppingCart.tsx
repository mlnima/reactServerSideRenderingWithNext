import React from 'react';
import Link from 'next/link';

const ShoppingCart = () => {
    return (
        <Link href={'/checkout'} className={'shoppingCardButton'}>
            card
        </Link>
    );
};
export default ShoppingCart;
