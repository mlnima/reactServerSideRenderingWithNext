import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
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
        <AppLayout {...props}>
            <div className='main'>
                {renderCheckOutItems}
            </div>
        </AppLayout>
    );
};

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
