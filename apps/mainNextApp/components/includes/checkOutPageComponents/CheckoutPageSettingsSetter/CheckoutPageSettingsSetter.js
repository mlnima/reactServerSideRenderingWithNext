import React, {useEffect, useState, useContext, useRef} from 'react';
import Head from 'next/dist/next-expressServer/lib/head'

const CheckoutPageSettingsSetter = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <Head>
            <script  src="https://www.paypal.com/sdk/js?client-id=AQHpGq9Jlzav9WQEDDWXZN9au4OS_lc4AHcdfmRL0eoyc0ktCh2zjv8GC0cQdFtqVCTWKBgw0c5Y1z2T&currency=EUR"/>
        </Head>
    );
};
export default CheckoutPageSettingsSetter;
