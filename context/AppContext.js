import React, { useEffect, useRef, useState } from 'react';
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken';
import axios from "axios";

import { withRouter } from "next/router";

export const AppContext = React.createContext();

const AppProvider = props => {

    const [ state, dispatchState ] = useState({
        loading: false,
        videoPreviewID: ''
    });
    const [ siteIdentity, dispatchSiteIdentity ] = useState({
        title: 'site title',
        themeColor: '#000',
        description: 'site description',
        keywords: []
    });
    const [ settings, dispatchSettings ] = useState({
        adminPanelSideBar: false,
        test: false
    });
    const [ userData, dispatchUserData ] = useState({});
    const [ navigationData, dispatchNavigationData ] = useState([]);
    const [ editingPostData, dispatchEditingPostData ] = useState({
        categories: [],
        actors: [],
        tags: [],
        title: '',
        author: '',
        description: '',
        disLikes: 0,
        mainThumbnail: '',
        videoTrailerUrl: '',
        videoEmbedCode: '',
        likes: 0,
        quality: '',
        status: '',
        postType: '',
        sourceSite: '',
        views: 0,
    });
    const [ adminPosts, dispatchAdminPosts ] = useState([]);
    const [ adminPostsData, dispatchAdminPostsData ] = useState({
        pageNo: 1,
        size: 30,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'all',
        author: 'all',
        fields: [ 'author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories' ],
        checkedPosts: [],
    });
    const [ widgetsSettings, dispatchWidgetsSettings ] = useState({
        widgets: [],

    });
    const [ Posts, dispatchPosts ] = useState([]);
    const [ videoPostsDataForClient, dispatchVideoPostsDataForClient ] = useState({
        pageNo: 1,
        size: 12,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'all',
        author: 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        checkedPosts: [],
    });

    const [ functions, dispatchFunctions ] = useState({
        getAndSetUserInfo: async () => {
            if (localStorage.wt) {
                await axios.post('/api/v1/users/getUserInfo', { token: localStorage.wt }).then(res => {
                    dispatchUserData({ ...userData, ...res.data.userData });
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        logOutUser: () => {
            localStorage.removeItem('wt');
            dispatchUserData({})
            props.router.push('/')
        },
        goToAdminPanel: () => {
            props.router.push('/admin')
        },
        goToHomePage: () => {
            // props.router.push('/')
        },
        savePosts: async (data) => {
            const body = {
                postData: data,
                token: localStorage.wt
            };
            return axios.post('/api/v1/posts/createNewPost', body)
        },
        updatePost: async (data) => {
            const body = {
                postData: data,
                token: localStorage.wt
            };
            return axios.post('/api/v1/posts/updatePost', body)
        },
        getPosts: async (data) => {
            const body = {
                ...data,
            };
            return await axios.post('/api/v1/posts', body)
        },
        //exported to variables file ----
        getPost: async (_id) => {
            const body = {
                _id,
                token: localStorage.wt
            };
            return await axios.post('/api/v1/posts/post', body)
        },
        setEditingPostData: (name, value) => {
            dispatchEditingPostData(editingPostData => ({
                ...editingPostData,
                [name]: value
            }))
        },
        bulkActionPost: (ids, status) => {
            dispatchState({
                ...state,
                loading: true
            });
            const body = {
                ids,
                status,
                token: localStorage.wt
            };
            axios.post('/api/v1/posts/postsBulkAction', body).then(() => {
                dispatchState({
                    ...state,
                    loading: false
                });

            }).catch(() => {
                dispatchState({
                    ...state,
                    loading: false
                });
            })
        },
        deletePost: (id) => {
            const body = {
                _id: id,
                token: localStorage.wt
            };
            return axios.post('/api/v1/posts/deletePost', body)
        },
        likeValueCalculator: (likes, dislikes) => {
            let finalValue = 0;
            if (likes > 0 && dislikes > 0) {
                let total = likes + dislikes;
                let likesTo100 = likes * 100;
                let value = Math.round(likesTo100 / total);
                finalValue = value;
            }
            if (likes === 0 && dislikes === 0) {
                finalValue = 0;
            }
            if (likes === 0 && dislikes > 0) {
                finalValue = 0;

            }
            if (likes > 0 && dislikes === 0) {
                finalValue = 100
            }
            return finalValue

        }
    });

    useEffect(() => {
        functions.getAndSetUserInfo()
    }, []);

    useEffect(() => {
        if (props.router.pathname === '/admin/posts') {
            functions.getPosts(adminPostsData).then(res => {
                dispatchAdminPosts(res.data.posts);
                dispatchAdminPostsData({
                    ...adminPostsData,
                    totalPosts: parseInt(res.data.totalCount),
                })
            })
        }
    }, [ props.router.pathname, adminPostsData.pageNo, adminPostsData.size, adminPostsData.postType, adminPostsData.keyword, adminPostsData.status, adminPostsData.fields ]);

    return (
        <div>
            <AppContext.Provider
                value={ {
                    state,
                    dispatchState,
                    settings,
                    dispatchSettings,
                    userData,
                    dispatchUserData,
                    functions,
                    editingPostData,
                    dispatchEditingPostData,
                    adminPosts,
                    dispatchAdminPosts,
                    adminPostsData,
                    dispatchAdminPostsData,
                    videoPostsDataForClient,
                    dispatchVideoPostsDataForClient,
                    navigationData,
                    dispatchNavigationData,
                    dispatchSiteIdentity,
                    siteIdentity,
                    widgetsSettings,
                    dispatchWidgetsSettings
                } }>

                { props.children }
            </AppContext.Provider>
        </div>
    )
};

export const AppProviderWithRouter = withRouter(AppProvider);

//"dev": "nodemon -w ./server/server.js ./server/server.js",