import React from 'react';
import './Logo.scss';
import Link from "next/link";

const Logo = () => {
    return (
        <Link href='/'>
            <div className='Logo'>
                <img src='/static/images/Logo.png'/>
            </div>
        </Link>
    );
};

export default Logo;
