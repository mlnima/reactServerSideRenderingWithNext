import React from 'react';
import Link from "next/link";
import './TopBar.scss';

const TopBar = () => {
    return (
        <div className='TopBar'>
            <Link href='/auth/login'><a>Login</a></Link>
            <span>Or</span>
            <Link href='/auth/register'><a>Register</a></Link>
        </div>
    );
};

export default TopBar;
