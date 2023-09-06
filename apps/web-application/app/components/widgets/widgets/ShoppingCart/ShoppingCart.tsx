import React, {FC} from 'react';
import Link from "next/link";

interface IProps {
}

const ShoppingCart: FC<IProps> = ({}) => {

    return (
        <Link href={'/checkout'} className={'shoppingCardButton'}>
            card
        </Link>
    );
};
export default ShoppingCart;
