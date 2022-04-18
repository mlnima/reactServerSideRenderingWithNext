import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components';

//until next update for react draggable =>https://github.com/react-grid-layout/react-draggable/pull/648
import React from "react";
import {TFunctionResult} from "i18next";

declare module "react-draggable" {
    export interface DraggableProps {
        children: React.ReactNode;
        // children: any;
    }
}


// declare module "next-i18next" {
//     export interface WithTranslation {
//         t: string;
//     }
// }






//******************************************************

//@ts-ignore
class MyDocument extends Document {

    static async getInitialProps(ctx)  {
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
}

export default MyDocument