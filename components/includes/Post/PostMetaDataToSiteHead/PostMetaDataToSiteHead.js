import React from 'react';
import Head from "next/head";

const PostMetaDataToSiteHead = props => {

    if (props.post.title) {
        return (
            <Head>
                <title>{ props.post.title }</title>
                <meta name="description" content={ props.post.description }/>
                <meta name="keywords" content={ [ ...props.post.tags.map(i=>i.name), ...props.post.categories.map(i=>i.name), ...props.post.actors.map(i=>i.name) ] }/>
                <meta property="og:title" content={ props.post.title }/>
                <meta property="og:type" content={ props.post.postType === 'video' ? props.post.postType + '.' + 'movies' : props.post.postType }/>
                {/*url should define*/ }
                <meta property="og:url" content={ props.post.videoEmbedCode }/>
                <meta property="og:image" content={ props.post.mainThumbnail }/>
            </Head>
        )
    } else return null
};
export default PostMetaDataToSiteHead;
