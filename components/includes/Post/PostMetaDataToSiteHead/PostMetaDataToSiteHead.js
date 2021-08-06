import Head from "next/head";

const PostMetaDataToSiteHead = props => {

    const keywords = [...(props.tags || []), ...(props.categories || []), ...(props.actors || [])].map(i => i.name);
    const locals = process.env.REACT_APP_LOCALS.split(' ');
    const postUrls = locals.map(local=>{
        if (local === process.env.REACT_APP_DEFAULT_LOCAL){
            return <link rel="alternate" hrefLang={local} href={`${process.env.REACT_APP_PRODUCTION_URL}/${props.url}`}/>
        }else  return <link rel="alternate" hrefLang={local} href={`${process.env.REACT_APP_PRODUCTION_URL}/${local + props.url}`}/>
    })

    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description || props.title}/>
            <meta name="keywords" content={keywords}/>
            <meta property="og:title" content={props.title}/>
            {postUrls}
            <meta property="og:type" content={props.postType === 'video' ? props.postType + '.' + 'other' : props.postType}/>
            <meta property="og:url" content={process.env.REACT_APP_PRODUCTION_URL + props.url}/>
            <meta property="og:image" content={props.mainThumbnail}/>
            {props.postType === 'video'? <meta property="og:video:duration" content={props.duration}/>:null}
        </Head>
    )
};
export default PostMetaDataToSiteHead;

