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
import {getTextDataWithTranslation,  isAppleMobileDevice} from "@_variables/_variables";
import {AnyAction} from "redux";
import isUserFromExternalLink from "@_variables/util/isUserFromExternalLink";

//@ts-ignore
export const setLoginRegisterFormStatus = (statusType):AnyAction => dispatch => {
    dispatch({
        type: LOGIN_REGISTER_FORM,
        payload: statusType
    })
}
//@ts-ignore
export const setLoading = (statusType):AnyAction  => dispatch => {
    dispatch({
        type: LOADING,
        payload: statusType
    })
}
//@ts-ignore
export const setAlert = (payload):AnyAction  => dispatch => {
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
//@ts-ignore
export const closeAlert = ():AnyAction  => dispatch => {
    dispatch({
        type: CLOSE_ALERT,
        payload: null
    })
}
//@ts-ignore
export const setSideHeadData = (headData):AnyAction  => dispatch => {
    dispatch({
        type: SET_HEAD_DATA,
        payload: headData
    })
}
//@ts-ignore
export const checkRouteAndSetLoading = (path, nextPath):AnyAction  => dispatch => {
    if (path !== nextPath) {
        dispatch({
            type: CHECK_ROUTE_AND_SET_LOADING,
            payload: true
        })
    }
}
//@ts-ignore
export const hydrateGlobalState = (data):AnyAction  => dispatch => {
    dispatch({
        type: HYDRATE,
        payload: data
    })
}


export const getDefaultPageData =
    //@ts-ignore
    (context: GetServerSidePropsContext, dynamicWidgets: string[], options?: { page: string, setHeadData: boolean }):AnyAction  => async dispatch => {
        let isDefaultDataSet = false
        const isUserInternal  = context.req?.headers?.referer &&
                                !context.req?.headers?.referer.includes(process.env.NEXT_PUBLIC_PRODUCTION_URL)

        // console.log('referer: ',isUserInternal)



        context.res.setHeader(
            'Cache-Control',
            'public, s-maxage=604800, stale-while-revalidate=604800'
        )

        const cache = process.env.NODE_ENV !== 'development'
        const userAgent = context.req.headers['user-agent'];
        let staticWidgets = []
        let staticData = {
            design:{},
            identity:{
                themeColor:'#000'
            }
        }

        if (!isUserInternal || !isDefaultDataSet){
            //@ts-ignore
            staticWidgets = staticWidgetsJson?.widgets || []
            //@ts-ignore
            staticData = staticDataJson

            dispatch({
                type: GET_SETTINGS,
                payload: {
                    design: staticData?.design || {},
                    identity: staticData?.identity || {},
                    eCommerce: {},
                    ip: context.req?.headers['x-forwarded-for'] || context.req?.socket?.remoteAddress,
                    isMobile: Boolean(userAgent?.match(
                        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
                    )),
                    isAppleMobileDevice: isAppleMobileDevice(userAgent)
                }
            })
            isDefaultDataSet = true
        }


        if (options?.setHeadData && options?.page?.match('search|tags|categories|actors|home|posts|chatroom|messenger|login|register')) {

            const title = options.page && options?.page?.match('search|tags|categories|actors') ?
                (options.page === 'search' ? `${context.query?.keyword} ` : '') +
                getTextDataWithTranslation(context.locale, `${options.page}PageTitle`, staticData?.identity) +
                //@ts-ignore
                (staticData?.identity?.siteName ? ` | ${staticData?.identity?.siteName}` : '') :
                getTextDataWithTranslation(context.locale, 'title', staticData?.identity)

            const description = options.page && options?.page?.match('search|tags|categories|actors') ?
                (options.page === 'search' ? `${context.query?.keyword} ` : '') +
                getTextDataWithTranslation(context.locale, `${options.page}PageDescription`, staticData?.identity) +
                //@ts-ignore
                (staticData?.identity?.siteName ? ` | ${staticData?.identity?.siteName}` : ''):
                getTextDataWithTranslation(context.locale, 'description', staticData?.identity)


            const canonicalUrl= options?.page?.match('categories|tags|actors') ?
                { canonicalUrl : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${options?.page}`} :
                options?.page?.match('search') ?
                    { canonicalUrl : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${context.query?.keyword}`} :
                options?.page?.match('home') ?
                    { canonicalUrl : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}`} :
                {}

            // console.log(title)
            dispatch({
                type: SET_HEAD_DATA,
                payload: {
                    title: title || null,
                    description: description?.substring(0, 155) || null,
                    keywords: [(options.page !== 'home' ? options.page:'' ) ,...(getTextDataWithTranslation(context.locale, 'keywords', staticData?.identity) || [])],
                    themeColor: staticData.identity?.themeColor || '#000',
                    ...canonicalUrl,
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
                    ogDescription: description?.substring(0, 155) || null,
                    ogType: 'website',
                    ogUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    //@ts-ignore
                    ogImage: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',

                    twitterCard: true,
                    twitterUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    twitterTitle: title || null,
                    //@ts-ignore
                    twitterSite: staticData?.identity?.siteName || null,
                    twitterDescription: description?.substring(0, 155) || null,
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


