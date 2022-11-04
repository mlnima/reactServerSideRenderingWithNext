import Head from "next/head";
import {FC} from "react";

interface MetaDataToSiteHeadPropTypes {
    title: string,
    description?: string,
    image?: string,
    url: string
}

const MetaDataToSiteHead: FC<MetaDataToSiteHeadPropTypes> = ({title, description, image, url}) => {
    return (
        <Head>
            {title ? <title>{title}</title> : null}
            {title ? <meta name="keywords" content={`${title}`}/> : null}
            {description || title ? <meta name="description" content={description || title}/> : null}
            {title ? <meta property="og:title" content={title}/> : null}
            {url ? <meta property="og:url" content={process.env.NEXT_PUBLIC_PRODUCTION_URL + url}/> : null}
            {image ? <meta property="og:image" content={image}/> : null}
        </Head>
    );
};
export default MetaDataToSiteHead;
