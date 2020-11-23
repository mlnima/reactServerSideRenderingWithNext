import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import dataDecoder from "../../server/tools/dataDecoder";
import contact from "../contact";
import SiteSettingSetter from "../../components/includes/SiteSettingsSetter/SiteSettingsSetter";
import {AppContext} from "../../context/AppContext";
import {getPost} from "../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview";

const checkout = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [itemsData, setItemsData] = useState([])

    useEffect(() => {
        if (contextData.checkOutData.items.length > 0) {
            getCheckOutItems()
        }
    }, [contextData.checkOutData]);

    useEffect(() => {
        console.log(itemsData)
    }, [itemsData]);


    const getCheckOutItems = async ()=>{
        let checkOutItems = []
        for await (let item of contextData.checkOutData.items){
            const requestBody = {
                _id: item.productId
            };
            const itemData = await getPost(requestBody, window.location.origin, false)
            checkOutItems.push({...itemData.data.post,orderData:item})

        }
        setItemsData([...itemsData, ...checkOutItems])
    }


    const renderCheckOutItems = (itemsData||[]).map(item=>{
        return(
            <CheckOutItemPreview key={(itemsData||[]).indexOf(item)} {...item}/>
        )
    })

    return (
        <AppLayout>
            <SiteSettingSetter  {...props} />
            {renderCheckOutItems}
        </AppLayout>
    );
};

// checkout.getInitialProps = async ({pathname, query, req, asPath}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let errorCode = 200
//     let settings;
//     let widgets;
//     const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
//     const widgetsData = await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, domainName, true, 'tagsPage')
//
//     settings = settingsData.data.settings ? settingsData.data.settings : []
//     widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
//
//     return {...settings, query, pathname, asPath, widgets}
// }

export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let errorCode = 200
    let settings;
    let widgets;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, domainName, true, 'tagsPage')

    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return {props:{...settings, query, widgets}}
}





export default checkout;
