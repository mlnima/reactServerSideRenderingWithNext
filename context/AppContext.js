import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios'
import {useRouter} from "next/router";
import {getSignedInUserData} from "../_variables/ajaxAuthVariables";
import _getMultipleWidgets from "../_variables/adminAjaxVariables/adminAjaxWidgetsVariables/_getMultipleWidgets";
import {getSetting} from "../_variables/ajaxVariables";
import getMultipleSetting from "../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting";


export const AppContext = createContext();

const AppProvider = props => {
    const router = useRouter()

    const [state, dispatchState] = useState({
        loading: false,
        videoPreviewID: '',
        activeLanguage: router.locale || router.query.locale || 'default',
        navigationOpenStatus: false,
        console: false,
        deviceWidth: 320,
        checkoutSlideEnable: false,
        designSet: false,
        identitySet: false,
        loginRegisterFormPopup: false,
        loginRegisterFormPopupType: 'login'
    });

    const [widgets, setWidgets] = useState([])
    const [alert, dispatchAlert] = useState({
        active: false,
        alertMessage: '',
        type: ''
    })

    const [checkOutData, setCheckOutData] = useState({
        items: []
    })

    const [siteIdentity, dispatchSiteIdentity] = useState({
        isSet: false,
        title: 'site title',
        themeColor: '#000',
        description: 'site description',
        keywords: [],
        customScripts: []
    });

    const [eCommerceSettings, dispatchECommerceSettings] = useState({
        translations: {}
    })

    const [siteDesign, dispatchSiteDesign] = useState({});

    const [settings, dispatchSettings] = useState({
        adminPanelSideBar: false,
        textEditorCurrentFile: '',
        textEditorEditMode: false
    });

    const [userData, dispatchUserData] = useState({});


    const [adminPosts, dispatchAdminPosts] = useState([]);

    const [widgetsSettings, dispatchWidgetsSettings] = useState({
        widgets: [],
    });

    const [siteWidgets, setSiteWidgets] = useState([])

    const [callData, setCallData] = useState({
        calling: false,
        answering: false,
        callAccepted: false,
        receivingCall: false,
        callOptions: {
            video: true,
            audio: true
        },
        camera: true,
        microphone: true
    })


    const [functions, dispatchFunctions] = useState({
        getAndSetUserInfo: async () => {
            if (localStorage.wt) {
                getSignedInUserData(['username', 'role', 'keyMaster', 'profileImage', 'coverImage']).then(res => {
                    dispatchUserData({...userData, ...res.data.userData});
                }).catch(err => {
                    console.log(err);
                    localStorage.removeItem('wt')
                })
            }
        },
        createOrder: (data) => {
            if (data.type === 'payPal') {
                const body = {
                    data
                }
                return axios.post('/api/v1/orders/create/payPal', body)
            }
        },
        logOutUser: () => {
            localStorage.removeItem('wt');
            dispatchUserData({})
            router.push('/')
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
            axios.post('/api/admin/posts/postsBulkAction', body).then(() => {
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
            return axios.post('/api/admin/posts/deletePost', body)
        },
        // updateSetting: async (type, data) => {
        //     const body = {
        //         token: localStorage.wt,
        //         type,
        //         data
        //     };
        //     return await axios.post(window.location.origin + '/api/admin/settings/update', body)
        // },
        clearCaches: async () => {

            const body = {
                token: localStorage.wt,
            };
            return await axios.post(window.location.origin + '/api/v1/settings/clearCaches', body)
        },
        getCheckOutData: () => {
            if (typeof window !== 'undefined') {
                if (localStorage?.checkOutItems) {
                    const items = JSON.parse(localStorage.checkOutItems)
                    setCheckOutData({
                        items
                    })
                }
            }
        },
        loadingHandler: () => {
            state.loading ?
                dispatchState({
                    ...state,
                    loading: false
                }) :
                dispatchState({
                    ...state,
                    loading: true
                })
        }


    });

    // useEffect(() => {
    //     if (localStorage.wt) {
    //         getSignedInUserData(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']).then(res => {
    //             if (res?.data?.userData) {
    //                 dispatchUserData({
    //                     ...userData,
    //                     ...res.data.userData
    //                 });
    //             }
    //         }).catch(err => {
    //             localStorage.removeItem('wt')
    //         })
    //         //functions.getAndSetUserInfo()
    //         functions.getCheckOutData()
    //     }
    //
    // }, []);


    useEffect(() => {
        if (userData.role === 'administrator') {
            _getMultipleWidgets(localStorage.wt).then(res => {
                setWidgets(res.data.widgets || [])
            })
            // getMultipleSetting({settings:['design','identity']},localStorage.wt).then(settingsResponse=>{
            //     if (settingsResponse?.data?.settings){
            //         const identity = settingsResponse?.data?.settings.find(s=>s.type=== 'identity')?.data
            //         const design = settingsResponse?.data?.settings.find(s=>s.type=== 'design').data
            //         identity ? dispatchSiteIdentity(identity) : null
            //         design ? dispatchSiteDesign(design) : null
            //     }
            // })
        }
    }, [userData]);


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
                    adminPosts,
                    dispatchAdminPosts,
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
                    dispatchECommerceSettings,
                    widgets
                }}>
                {props.children}
            </AppContext.Provider>

        </>
    )
};

export default AppProvider;

