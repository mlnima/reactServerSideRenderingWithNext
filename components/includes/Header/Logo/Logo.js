import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <Link href='/'>
            <div className='Logo'>
                <img src='/static/images/logo/Logo.png'/>
            </div>
        </Link>
    );
};

export default Logo;
