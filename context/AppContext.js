import React, { useEffect, useState,createContext} from 'react';
import axios from "axios";
import {useRouter} from "next/router";


export const AppContext = createContext();

const AppProvider = props => {
    const router = useRouter()

    const [state, dispatchState] = useState({
        loading: false,
        videoPreviewID: '',
        activeLanguage: router.locale || router.query.locale || 'default',
        navigationOpenStatus: false,
        isMobile: true,
        console:false,
        currentPageSidebar:true,
        deviceWidth:320,
        checkoutSlideEnable:false
    });



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

    const [eCommerceSettings,dispatchECommerceSettings]= useState({
        translations:{}
    })

    const [siteDesign, dispatchSiteDesign] = useState({});

    const [settings, dispatchSettings] = useState({
        adminPanelSideBar: false,
        textEditorCurrentFile: '',
        textEditorEditMode: false
    });

    const [userData, dispatchUserData] = useState({});

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
                    localStorage.removeItem('wt')
                })
            }
        },
        createOrder: (data) => {
             if (data.type === 'payPal'){
                 const body ={
                     data
                 }
                 return axios.post('/api/v1/order/create/payPal',body)
             }
        },
        logOutUser: () => {
            localStorage.removeItem('wt');
            dispatchUserData({})
            router.push('/')
        },
        goToAdminPanel: () => {
            router.push('/admin')
        },
        goToHomePage: () => {
            // router.push('/')
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
                // router.push({ pathname: router.pathname, query: { ...router.query } })
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
            if (typeof window !== 'undefined'){
                if (localStorage?.checkOutItems){
                    const items = JSON.parse(localStorage.checkOutItems)
                    setCheckOutData({
                        items
                    })
                }
            }
        },
        loadingHandler : ()=>{
            state.loading ?
                dispatchState({
                    ...state,
                    loading: false
                }):
                dispatchState({
                    ...state,
                    loading: true
                })
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
                    setCheckOutData,
                    eCommerceSettings,
                    dispatchECommerceSettings

                }}>
                {props.children}
            </AppContext.Provider>

        </>
    )
};

export default AppProvider ;

