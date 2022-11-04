import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components';
import React from "react";
// import {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

}

MyDocument.getInitialProps = async (ctx) =>{
    const styledComponentsSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage;
    try {
        ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => styledComponentsSheet.collectStyles(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,

            styles: (
                <React.Fragment>
                    {initialProps.styles}
                    {styledComponentsSheet.getStyleElement()}
                </React.Fragment>
            ),
        };
    } finally {
        styledComponentsSheet.seal();
    }
}

export default MyDocument