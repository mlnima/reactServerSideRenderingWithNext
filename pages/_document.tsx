import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';
import React from "react";
// import {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

    // render() {
    //     return (
    //         <Html>
    //             <Head/>
    //             <body>
    //                 <Main/>
    //                 <NextScript/>
    //             </body>
    //         </Html>
    //     )
    // }
}

MyDocument.getInitialProps = async (ctx) =>{
    const styledComponentsSheet = new ServerStyleSheet()
    const materialSheets = new ServerStyleSheets()
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
                    {/*{materialSheets.getStyleElement()}*/}
                    {styledComponentsSheet.getStyleElement()}
                </React.Fragment>
            ),
        };
    } finally {
        styledComponentsSheet.seal();
    }
}

export default MyDocument