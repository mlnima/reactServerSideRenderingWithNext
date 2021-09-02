import Head from "next/head";

const MetaDataToSiteHead = props => {
    return (
        <Head>
            {props.title? <title>{props.title}</title>:null}
            {props.title?   <meta name="keywords" content={`${props.title}`}/>:null}
            {props.description || props.title? <meta name="description" content={props.description|| props.title}/>:null}
            {props.title?  <meta property="og:title" content={props.title}/>:null}
            {props.url? <meta property="og:url" content={process.env.REACT_APP_PRODUCTION_URL + props.url}/>:null}
            {props.image? <meta property="og:image" content={props.image}/>:null}
        </Head>
    );
};
export default MetaDataToSiteHead;
