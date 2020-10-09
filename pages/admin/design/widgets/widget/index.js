import React, {useEffect, useState, useContext, useRef} from 'react';
import {useRouter} from "next/router";
import AdminLayout from "../../../../../components/layouts/AdminLayout";
import {getSingleWidgetData} from "../../../../../_variables/ajaxVariables";

const widget = props => {
    const router = useRouter()
    const [widgetData, setWidgetData] = useState({
        widgetId:''
    });

    useEffect(() => {
            if (router.query.id){
                getSingleWidgetData({id:router.query.id}).then(res=>{
                    console.log(res.data.widgetData)
                })
            }
    }, [props]);

    return (
        <AdminLayout>
            widget
        </AdminLayout>
    );
};
export default widget;
