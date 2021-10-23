import React, {useState, createContext} from 'react';
import axios from 'axios'
import {useRouter} from "next/router";

export const AppContext = createContext();

const AppProvider = props => {
    const router = useRouter()

    const [state, dispatchState] = useState({
        loading: false,
        activeLanguage: router.locale || router.query.locale || 'default',
        console: false,
        checkoutSlideEnable: false,
    });

    const [widgets, setWidgets] = useState([])

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



    const [functions, dispatchFunctions] = useState({

        createOrder: (data) => {
            if (data.type === 'payPal') {
                const body = {
                    data
                }
                return axios.post('/api/v1/orders/create/payPal', body)
            }
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

        // clearCaches: async () => {
        //
        //     const body = {
        //         token: localStorage.wt,
        //     };
        //     return await axios.post(window.location.origin + '/api/v1/settings/clearCaches', body)
        // },
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

    });


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

