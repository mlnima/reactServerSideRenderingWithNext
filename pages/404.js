import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const Custom404 = props => {
    const router = useRouter()

    return (
        <div id='not-found-page'>
            <style jsx>{`
              #not-found-page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 50vh;

                h1 {
                  color: var(--main-text-color);
                }
                .back-to-homepage{
                  color: var(--main-text-color);
                  text-decoration: none;
                }
              }
            `}</style>
            <h1>404 - Page Not Found</h1>
            <Link href="/"><a className='back-to-homepage'>
                <h2>back to homepage</h2>
            </a></Link>
        </div>
    );
};

export default Custom404;
