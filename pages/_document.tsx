import Document, {DocumentContext, DocumentInitialProps} from 'next/document'
import {ServerStyleSheet} from 'styled-components';
import React from "react";
import {Html, Head, Main, NextScript} from 'next/document'

// declare module "react-draggable" {
//     //until next update for react draggable =>https://github.com/react-grid-layout/react-draggable/pull/648
//     export interface DraggableProps {
//         children: React.ReactNode;
//         // children: any;
//     }
// }

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                //@ts-ignore
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument