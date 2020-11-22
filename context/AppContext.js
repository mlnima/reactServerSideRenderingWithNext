import React, {useContext, useEffect, useRef, useState} from 'react';
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken';
import axios from "axios";
import dataDecoder from '../server/tools/dataDecoder'
import dataEncoder from '../server/tools/dataEncoder'

import {withRouter} from "next/router";
import styled from "styled-components";

export const AppContext = React.createContext();

const AppProvider = props => {
    // const contextData = useContext(AppContext);
    const [state, dispatchState] = useState({
        loading: false,
        videoPreviewID: '',
        activeLanguage: 'default',
        navigationOpenStatus: false,
        isMobile: true,
        console:false,
        currentPageSidebar:true,
        deviceWidth:320
    });


    useEffect(() => {
        window.innerWidth >= 768?
            dispatchState({
                ...state,
                isMobile: false,
                navigationOpenStatus:true
            }):
            dispatchState({
                ...state,
                isMobile: true,
                navigationOpenStatus:false
            })
    }, [props]);

    const [alert, dispatchAlert] = useState({
        active: false,
        alertMessage: '',
        type: ''
    })

    const [checkOutData, setCheckOutData]= useState({
        items:[]
    })

    const [siteIdentity, dispatchSiteIdentity] = useState({
        title: 'site title',
        themeColor: '#000',
        description: 'site description',
        keywords: [],
        customScripts: []
    });
    const [siteDesign, dispatchSiteDesign] = useState({});

    const [settings, dispatchSettings] = useState({
        adminPanelSideBar: false,
        textEditorCurrentFile: '',
        textEditorEditMode: false
    });

    const [galleryData, setGalleryData] = useState({
        path: './static'
    })

    const [userData, dispatchUserData] = useState({});

    const [navigationData, dispatchNavigationData] = useState([]);

    const [editingPostData, dispatchEditingPostData] = useState({
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
    const [adminPosts, dispatchAdminPosts] = useState([]);

    const [adminPostsData, dispatchAdminPostsData] = useState({
        pageNo: 1,
        size: 30,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'all',
        author: 'all',
        fields: ['author', 'title', 'mainThumbnail', 'status', 'actors', 'tags', 'categories'],
        checkedPosts: [],
    });
    const [widgetsSettings, dispatchWidgetsSettings] = useState({
        widgets: [],
    });

    const [siteWidgets, setSiteWidgets] = useState([])

    const [videoPostsDataForClient, dispatchVideoPostsDataForClient] = useState({
        pageNo: 1,
        size: 12,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'all',
        author: 'all',
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration'],
        checkedPosts: [],
    });

    const [functions, dispatchFunctions] = useState({
        getAndSetUserInfo: async () => {
            if (localStorage.wt) {
                await axios.post('/api/v1/users/getUserInfo', {token: localStorage.wt}).then(res => {
                    dispatchUserData({...userData, ...res.data.userData});
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
        setEditingPostData: async (name, value) => {
            dispatchEditingPostData(editingPostData => ({
                ...editingPostData,
                [name]: value
            }))
        },
        bulkActionPost: async (ids, status) => {
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
                // props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
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
        updateSetting: async (type, data) => {
            const body = {
                token: localStorage.wt,
                type,
                data
            };
            return await axios.post(window.location.origin + '/api/v1/settings/update', body)
        },
        clearCaches: async () => {

            const body = {
                token: localStorage.wt,
            };
            return await axios.post(window.location.origin + '/api/v1/settings/clearCaches', body)
        },
        getCheckOutData: ()=>{
            if (localStorage){
                if (localStorage.checkOutItems){
                    const items = JSON.parse(localStorage.checkOutItems)
                    setCheckOutData({
                        ...checkOutData,
                        items
                    })
                }
            }
        }


    });

    useEffect(() => {
        functions.getAndSetUserInfo()
        functions.getCheckOutData()

    }, []);


    return (
        <>
            <AppContext.Provider
                value={{
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
                    dispatchWidgetsSettings,
                    siteDesign,
                    dispatchSiteDesign,
                    alert,
                    dispatchAlert,
                    siteWidgets,
                    setSiteWidgets,
                    checkOutData,
                    setCheckOutData
                    // adminWidgets,
                    // dispatchAdminWidgets
                }}>
                {props.children}
            </AppContext.Provider>

        </>
    )
};

export const AppProviderWithRouter = withRouter(AppProvider);

