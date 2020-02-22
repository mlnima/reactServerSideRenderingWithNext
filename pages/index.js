import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import Widget from "../components/includes/Widget/Widget";
import Posts from "../components/includes/Posts/Posts";
import withRouter from "next/dist/client/with-router";
import {getPosts} from "../_variables/ajaxPostsVariables";
import axios from "axios";
const fetch = require('node-fetch');
const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});

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
            <div className='HomePage'>
                <h1>Header 1</h1>
                {/*<Widget component={Videos} title='latest video' mainLinkUrl='/posts/' redirectToTitle='More videos' pagination={true} contextData={contextData} />*/ }
                <Posts />
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
        status: 'all',
        author: 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        checkedPosts: [],
    };

     const posts = await axios.post('http://localhost:3000/api/v1/posts/', {...data})
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

    return {posts:posts.data }
};
export default withRouter(Home);


