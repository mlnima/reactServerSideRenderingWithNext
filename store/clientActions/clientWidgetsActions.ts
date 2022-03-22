import {LOADING, SET_WIDGETS_IN_GROUPS} from '../types';
import Axios from "@_variables/util/Axios";
import _getMultipleWidgetWithDataQueryGenerator from "@_variables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import staticWidgetsJson from '../../static/jsons/staticWidgets.json';
import axios from "axios";

export const getWidgets = (dynamicWidgets,locale,cache) => async (dispatch: any) => {
    // const staticWidgetsFromEnv = process.env.NEXT_PUBLIC_STATIC_WIDGETS
    // const staticWidgets = staticWidgetsFromEnv ? JSON.parse(staticWidgetsFromEnv) : []

    const staticWidgets = staticWidgetsJson?.widgets || []

    await Axios.get(`/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(dynamicWidgets, cache, locale)}`
    ).then(res=>{
        dispatch({
            type:SET_WIDGETS_IN_GROUPS,
            payload:[...(res.data?.widgets || []),...staticWidgets ]
        })
    }).catch(err=>{
        dispatch({
            type:SET_WIDGETS_IN_GROUPS,
            payload:staticWidgets || []
        })
    })
}

export const saveFormData = (data) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
   await Axios.post('/api/v1/forms/saveFormData', {data}).then(res=>{

   }).catch(err=>{

   }).finally(()=>{
       dispatch({
           type: LOADING,
           payload: false
       })
   })

}