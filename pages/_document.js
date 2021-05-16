import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import flush from "styled-jsx/server";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const styles = flush();
        return { ...initialProps ,styles}
    }



    render() {
        return (
            <Html>
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument