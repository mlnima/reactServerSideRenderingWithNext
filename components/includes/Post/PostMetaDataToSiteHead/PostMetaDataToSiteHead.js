import Head from "next/head";

const PostMetaDataToSiteHead = ({title,description,tags,postType,videoEmbedCode,mainThumbnail,categories,actors}) => {
    return (
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ description || title }/>
            <meta name="keywords" content={ [ ...tags.map(i=>i.name), ...categories.map(i=>i.name), ...actors.map(i=>i.name) ] }/>
            <meta property="og:title" content={ title }/>
            <meta property="og:type" content={ postType === 'video' ? postType + '.' + 'movies' : postType }/>
            <meta property="og:url" content={ videoEmbedCode }/>
            <meta property="og:image" content={ mainThumbnail }/>
        </Head>
    )
};
export default PostMetaDataToSiteHead;

