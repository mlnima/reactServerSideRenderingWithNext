import {HYDRATE} from 'next-redux-wrapper';
import {
    CHECK_ROUTE_AND_SET_LOADING,
    CLOSE_ALERT, GET_SETTINGS,
    LOADING,
    LOGIN_REGISTER_FORM,
    SET_ALERT,
    SET_WIDGETS_IN_GROUPS
} from "@store/types";

import Axios from "@_variables/util/Axios";
import _getMultipleWidgetWithDataQueryGenerator
    from "@_variables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import staticDataJson from "../../static/jsons/staticData.json";
import staticWidgetsJson from "../../static/jsons/staticWidgets.json";
import {GetServerSidePropsContext} from "next";
// import {WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";


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


export const getDefaultPageData = (context: GetServerSidePropsContext, dynamicWidgets: string[]) => async dispatch => {
    const cache = process.env.NODE_ENV !== 'development'
    const userAgent = context.req.headers['user-agent'];
    const staticWidgets = staticWidgetsJson?.widgets || []

    dispatch({
        type: GET_SETTINGS,
        payload: {
            design: staticDataJson?.design || {},
            identity: staticDataJson?.identity || {},
            eCommerce: {},
            ip: context.req?.headers['x-forwarded-for'] || context.req?.socket?.remoteAddress,
            isMobile: Boolean(userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            ))
        }
    })

    if (dynamicWidgets.length){
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
    }else {
        dispatch({
            type: SET_WIDGETS_IN_GROUPS,
            payload: staticWidgets || []
        })
    }

}