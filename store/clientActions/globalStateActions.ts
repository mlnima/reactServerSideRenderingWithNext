import {HYDRATE} from 'next-redux-wrapper';
import Axios from "@_variables/util/Axios";
import _getMultipleWidgetWithDataQueryGenerator
    from "@_variables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import staticDataJson from "../../static/jsons/staticData.json";
import staticWidgetsJson from "../../static/jsons/staticWidgets.json";
import {GetServerSidePropsContext} from "next";
import {
    CLOSE_ALERT, GET_SETTINGS,
    LOADING,
    LOGIN_REGISTER_FORM,
    SET_ALERT, SET_HEAD_DATA, SET_REQUESTED_WIDGETS,
    SET_WIDGETS_IN_GROUPS
} from "@store/types";
import {getTextDataWithTranslation, isAppleMobileDevice, textContentReplacer} from "@_variables/_variables";
import {AnyAction} from "redux";
import {getSelectorsByUserAgent} from 'react-device-detect'
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";

//@ts-ignore
export const setLoginRegisterFormStatus = (statusType): AnyAction => dispatch => {
    dispatch({
        type: LOGIN_REGISTER_FORM,
        payload: statusType
    })
}
//@ts-ignore
export const setLoading = (statusType): AnyAction => dispatch => {
    dispatch({
        type: LOADING,
        payload: statusType
    })
}
//@ts-ignore
export const setAlert = (payload): AnyAction => dispatch => {
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
export const closeAlert = (): AnyAction => dispatch => {
    dispatch({
        type: CLOSE_ALERT,
        payload: null
    })
}
//@ts-ignore
export const setSideHeadData = (headData): AnyAction => dispatch => {
    dispatch({
        type: SET_HEAD_DATA,
        payload: headData
    })
}

//@ts-ignore
export const hydrateGlobalState = (data): AnyAction => dispatch => {
    dispatch({
        type: HYDRATE,
        payload: data
    })
}


export const getDefaultPageData =
    //@ts-ignore
    (context: GetServerSidePropsContext, dynamicWidgets: string[], options?: { page: string, setHeadData: boolean }, store?: any): AnyAction => async dispatch => {

        const userAgent = context.req.headers['user-agent'];
        const {isMobile} = getSelectorsByUserAgent(userAgent)
        let isDefaultDataSet = false
        const isUserInternal = context.req?.headers?.referer &&
            !context.req?.headers?.referer.includes(process.env.NEXT_PUBLIC_PRODUCTION_URL)
        context.res.setHeader(
            'Cache-Control',
            'public, s-maxage=604800, stale-while-revalidate=604800'
        )

        const cache = process.env.NODE_ENV !== 'development'

        let staticWidgets = []
        let staticData = {
            design: {},
            identity: {
                themeColor: '#000'
            }
        }

        if (!isUserInternal || !isDefaultDataSet) {

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
                    isMobile,
                    isAppleMobileDevice: isAppleMobileDevice(userAgent)
                }
            })
            isDefaultDataSet = true
        }


        if (
            options?.setHeadData &&
            options?.page?.match('search|tags|categories|actors|home|posts|chatroom|messenger|login|register')
        ) {

            const title = options.page && options?.page?.match('search|tags|categories|actors') ?
                textContentReplacer(
                    getTextDataWithTranslation(context.locale, `${options.page}PageTitle`, staticData?.identity)
                    //@ts-ignore
                    + ` | ${staticData?.identity?.siteName}`,
                    {
                        name: options.page === 'search' ?
                            `${capitalizeFirstLetter(context.query?.keyword)} ` :
                            ` ${capitalizeFirstLetter(options.page)} `
                    }
                )
                : getTextDataWithTranslation(context.locale, 'title', staticData?.identity)

            const description = options.page && options?.page?.match('search|tags|categories|actors') ?
                textContentReplacer(
                    getTextDataWithTranslation(context.locale, `${options.page}PageDescription`, staticData?.identity)
                    //@ts-ignore
                    + `| ${staticData?.identity?.siteName}`,
                    {
                        name: options.page === 'search' ?
                            `${capitalizeFirstLetter(context.query?.keyword)}` :
                            `${capitalizeFirstLetter(options.page)}`
                    }
                )
                : getTextDataWithTranslation(context.locale, 'description', staticData?.identity)


            const canonicalUrl = options?.page?.match('categories|tags|actors') ?
                {
                    canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${options?.page}`
                } : options?.page?.match('search') ?
                    {
                        canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${context.query?.keyword}`
                    } : options?.page?.match('home') ?
                        {
                            canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}`
                        } : options?.page?.match('chatroom') ?
                            {
                                canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/chatroom/${context.query?.chatRoomName}`
                            } : {
                                canonicalUrl: null
                            }

            dispatch({
                type: SET_HEAD_DATA,
                payload: {
                    title: title || null,
                    description: description?.substring(0, 155) || null,
                    keywords: [(options.page !== 'home' ? options.page : ''), ...(getTextDataWithTranslation(context.locale, 'keywords', staticData?.identity) || [])],
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
                    ogLocale: context?.locale || null,
                    ogTitle: title || null,
                    ogDescription: description?.substring(0, 155) || null,
                    ogType: 'website',
                    ogUrl: canonicalUrl?.canonicalUrl || null,
                    //@ts-ignore
                    ogImage: staticData?.identity?.favIcon || '/static/images/favIcon/favicon.png',

                    twitterCard: true,
                    twitterUrl: canonicalUrl?.canonicalUrl || null,
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
                    customScriptsAsString: staticData?.identity?.customScriptsAsString || null,
                    //@ts-ignore
                    rtaContent: staticData?.identity?.rtaContent || false,
                    //@ts-ignore
                    ogSiteName: staticData?.identity?.siteName || null,
                    ogLocale: context?.locale || null,
                    //@ts-ignore
                    twitterSite: staticData?.identity?.siteName || null,


                }
            })
        }


        if (dynamicWidgets?.length) {

            const prevStore = await store?.getState()
            const existingWidgets = prevStore.widgets?.requestedWidgets
            const difference = dynamicWidgets.filter(x => !existingWidgets.includes(x));

            if (difference.length) {
                await Axios.get(`/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(difference, cache, context.locale)}`
                ).then(res => {
                    dispatch({
                        type: SET_REQUESTED_WIDGETS,
                        payload: dynamicWidgets
                    })

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
            }


        } else {
            dispatch({
                type: SET_WIDGETS_IN_GROUPS,
                payload: staticWidgets || []
            })
        }

    }


