import {HYDRATE} from 'next-redux-wrapper';
import Axios from "@_variables/util/Axios";
import _getMultipleWidgetWithDataQueryGenerator
    from "@_variables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import staticDataJson from "../../static/jsons/staticData.json";
import staticWidgetsJson from "../../static/jsons/staticWidgets.json";
import {GetServerSidePropsContext} from "next";
import {
    CHECK_ROUTE_AND_SET_LOADING,
    CLOSE_ALERT, GET_SETTINGS,
    LOADING,
    LOGIN_REGISTER_FORM,
    SET_ALERT, SET_HEAD_DATA,
    SET_WIDGETS_IN_GROUPS
} from "@store/types";
import {getTextDataWithTranslation} from "@_variables/_variables";


export const setLoginRegisterFormStatus = (statusType) => dispatch => {
    dispatch({
        type: LOGIN_REGISTER_FORM,
        payload: statusType
    })
}

export const setLoading = (statusType) => dispatch => {
    dispatch({
        type: LOADING,
        payload: statusType
    })
}

export const setAlert = (payload) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload
    })

    setTimeout(() => {
        dispatch({
            type: SET_ALERT,
            payload: {
                active: false,
                type: null,
                message: ''
            }
        })
    }, 8000)
}

export const closeAlert = () => dispatch => {
    dispatch({
        type: CLOSE_ALERT,
        payload: null
    })
}

export const setSideHeadData = (headData) => dispatch => {
    dispatch({
        type: SET_HEAD_DATA,
        payload: headData
    })
}

export const checkRouteAndSetLoading = (path, nextPath) => dispatch => {
    if (path !== nextPath) {
        dispatch({
            type: CHECK_ROUTE_AND_SET_LOADING,
            payload: true
        })
    }
}

export const hydrateGlobalState = (data) => dispatch => {
    dispatch({
        type: HYDRATE,
        payload: data
    })
}


export const getDefaultPageData =
    (context: GetServerSidePropsContext, dynamicWidgets: string[], options?: { page: string, setHeadData: boolean }) => async dispatch => {

        const cache = process.env.NODE_ENV !== 'development'
        const userAgent = context.req.headers['user-agent'];
        const staticWidgets = staticWidgetsJson?.widgets || []

        const staticData = staticDataJson

        dispatch({
            type: GET_SETTINGS,
            payload: {
                design: staticData?.design || {},
                identity: staticData?.identity || {},
                eCommerce: {},
                ip: context.req?.headers['x-forwarded-for'] || context.req?.socket?.remoteAddress,
                isMobile: Boolean(userAgent.match(
                    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
                ))
            }
        })

        if (options?.setHeadData && options.page.match('search|tags|categories|actors|home|posts|chatroom|messenger|login|register')) {

            const title = options.page && options.page.match('search|tags|categories|actors') ?
                (options.page === 'search' ? `${context.query?.keyword} ` : '') +
                getTextDataWithTranslation(context.locale, `${options.page}PageTitle`, staticData?.identity) +
                //@ts-ignore
                (staticData?.identity?.siteName ? ` | ${staticData?.identity?.siteName}` : '') :
                getTextDataWithTranslation(context.locale, 'title', staticData?.identity)

            const description = options.page && options.page.match('search|tags|categories|actors') ?
                (options.page === 'search' ? `${context.query?.keyword} ` : '') +
                getTextDataWithTranslation(context.locale, `${options.page}PageDescription`, staticData?.identity) +
                //@ts-ignore
                (staticData?.identity?.siteName ? ` | ${staticData?.identity?.siteName}` : ''):
                getTextDataWithTranslation(context.locale, 'description', staticData?.identity)

            // console.log(title)
            dispatch({
                type: SET_HEAD_DATA,
                payload: {
                    title: title || null,
                    description: description || null,
                    keywords: [options.page ,...(getTextDataWithTranslation(context.locale, 'keywords', staticData?.identity) || [])],
                    themeColor: staticData.identity?.themeColor || '#000',
                    //@ts-ignore
                    favIcon: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',
                    //@ts-ignore
                    customScriptsAsString: staticData?.identity?.customScriptsAsString || '',
                    //@ts-ignore
                    rtaContent: staticData?.identity?.rtaContent || false,
                    //@ts-ignore
                    applicationName: staticData?.identity?.siteName || null,
                    //@ts-ignore
                    ogSiteName: staticData?.identity?.siteName || null,
                    ogLocale: context.locale,
                    ogTitle: title || null,
                    ogDescription: description || null,
                    ogType: 'website',
                    ogUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    //@ts-ignore
                    ogImage: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',

                    twitterCard: true,
                    twitterUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    twitterTitle: title || null,
                    //@ts-ignore
                    twitterSite: staticData?.identity?.siteName || null,
                    twitterDescription: description || null,
                    //@ts-ignore
                    twitterImage: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',
                }
            })

        } else {
            dispatch({
                type: SET_HEAD_DATA,
                payload: {
                    themeColor: staticData.identity?.themeColor || '#000',
                    //@ts-ignore
                    favIcon: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',
                    //@ts-ignore
                    customScriptsAsString: staticData?.identity?.customScriptsAsString || '',
                    //@ts-ignore
                    rtaContent: staticData?.identity?.rtaContent || false,
                    //@ts-ignore
                    ogSiteName: staticData?.identity?.siteName || null,
                    ogLocale: context.locale,
                    //@ts-ignore
                    twitterSite: staticData?.identity?.siteName || null,


                }
            })
        }


        if (dynamicWidgets?.length) {
            await Axios.get(`/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(dynamicWidgets, cache, context.locale)}`
            ).then(res => {
                dispatch({
                    type: SET_WIDGETS_IN_GROUPS,
                    payload: [...(res.data?.widgets || []), ...staticWidgets]
                })
            }).catch(err => {
                dispatch({
                    type: SET_WIDGETS_IN_GROUPS,
                    payload: staticWidgets || []
                })
            })
        } else {
            dispatch({
                type: SET_WIDGETS_IN_GROUPS,
                payload: staticWidgets || []
            })
        }

    }