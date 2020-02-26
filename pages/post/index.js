import React, { useEffect, useState, useContext } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import axios from "axios";
import { getPost } from "../../_variables/ajaxPostsVariables";
import Iframe from "../../components/includes/Post/Iframe/Iframe";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";

import withRouter from "next/dist/client/with-router";
import PostSidebar from "../../components/includes/Post/PostSidebar/PostSidebar";
import Head from "next/head";

const Post = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log(props)
    }, [ props ]);

    return (
        <AppLayout>
            <>
                <Head>
                    <title>{ props.post.title }</title>
                    <meta name="description" content={ props.post.description }/>
                    <meta name="keywords" content={ [ ...props.post.tags, ...props.post.categories,...props.post.actors ] }/>
                    <meta property="og:title" content={ props.post.title }/>
                    <meta property="og:type" content={ props.post.postType === 'video' ? props.post.postType + '.' + 'movies' : props.post.postType }/>
                    {/*url should define*/}
                    <meta property="og:url" content={ props.post.videoEmbedCode }/>
                    <meta property="og:image" content={ props.post.mainThumbnail }/>
                </Head>
                <div className='post'>
                    <PostSidebar/>
                    <div className="main">
                        <Iframe iframeCode={ props.post.videoEmbedCode } meta={ {
                            description: props.post.description,
                            title: props.post.title,
                            duration: props.post.duration,
                            thumbnailUrl: props.post.mainThumbnail,
                            embedURL: props.post.videoEmbedCode,
                            uploadDate: props.post.lastModify,
                        } }/>

                        <PostInfo
                            title={ props.post.title }
                            description={ props.post.description }
                            tags={ props.post.tags }
                            actors={ props.post.actors }
                            categories={ props.post.categories }
                            id={props.post._id}
                            likes={props.post.likes}
                            disLikes={props.post.disLikes}
                            views={props.post.views}
                            videoEmbedCode={props.post.videoEmbedCode}
                        />
                    </div>
                </div>
            </>
        </AppLayout>
    );
};

Post.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let post;
    const body = {
        postTitle: query.postTitle,
    };
    try {
        const postData = await axios.post('http://localhost:3000/api/v1/posts/post', body);
        post = postData.data.post
    } catch ( e ) {
        console.error(e)
    }
    return { post, query }
};

export default withRouter(Post);