import React from 'react';
import {useRouter} from "next/router";

const Custom404 = props => {
    const router = useRouter()

    return (
            <div className='notFoundPage'>
                <h1>404 - Page Not Found</h1>
            </div>
    );
};
export default Custom404;
