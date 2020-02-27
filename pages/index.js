import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import Widget from "../components/includes/Widget/Widget";
import Posts from "../components/includes/Posts/Posts";
import withRouter from "next/dist/client/with-router";
import {getPosts} from "../_variables/ajaxPostsVariables";
import Head from "next/head";
import axios from "axios";
import { getSetting } from "../_variables/ajaxVariables";

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.title || '',
        themeColor: props.identity.themeColor || '',
        description:props.identity.description|| '',
        keywords:props.identity.keywords|| []
    });

    const FakeComponentForTest = () => {

        return (
            <div>
                <p>test</p>
            </div>
        )
    };
    useEffect(() => {
        console.log(props)
    }, [ props ]);


    return (
        <AppLayout>
            <Head>
                <title>{state.title}</title>
                <meta name="theme-color" content={state.themeColor}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                <meta name="description" content={state.description}/>
                <meta name="keywords" content={state.keywords}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='HomePage'>
                <h1>Header 1</h1>
                {/*<Widget component={Videos} title='latest video' mainLinkUrl='/posts/' redirectToTitle='More videos' pagination={true} contextData={contextData} />*/ }
                <Posts posts={props.posts} />
            </div>
        </AppLayout>
    );
};

Home.getInitialProps = async ({pathname,query,req,res,err}) => {
    let data = {
        pageNo: query.pageNo ? parseInt(query.pageNo): 1,
        size: 30,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'published',
        author: 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        checkedPosts: [],
    };

     const posts = await axios.post('http://localhost:3000/api/v1/posts/', {...data});
     const identity = await getSetting('identity')

    const returnData =  {
        identity:identity.data.setting.data,
        posts:posts.data.posts
    }
     // const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // let testData = {
    //     name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //     pathname,
    //     query
    // };
    // console.log(testData )
    // const response = await fetch('http://localhost:3000/api/v1/posts/', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    // })

    return { posts:posts.data.posts,identity:identity.data.setting.data }
};
export default withRouter(Home);


