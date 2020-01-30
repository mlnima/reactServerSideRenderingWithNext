import React from 'react';
import Head from "next/head";
import './AdminLayout.scss'
import '../../styles/styles.scss';


const Panel = props => {
    return (
        <>
            <Head>
                <title>Website Title</title>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <script src="https://kit.fontawesome.com/e9c7c74c80.js" crossOrigin="anonymous"/>
                <meta name="description" content="description of the site"/>
                <meta name="keywords" content="key,word,for,SEO"/>
                /*
                <meta property="og:title" content="The Rock" />
                <meta property="og:type" content="video.movie" />
                <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
                <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />

                https://ogp.me/
                */


            <div className="Admin">
                { props.children }
            </div>
        </>
    );
};

export default Panel;
