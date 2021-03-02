import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";
import {getPost} from "../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview";
import './checkout.scss'

const checkout = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [itemsData, setItemsData] = useState([])

    useEffect(() => {
        if (contextData.checkOutData.items.length > 0) {
            setItemsData([])
            getCheckOutItems()
        }
    }, [contextData.checkOutData.items]);

    const getCheckOutItems = async () => {
        let checkOutItems = []

        for await (let item of contextData.checkOutData.items) {
            const requestBody = {
                _id: item.productId
            };
            const itemData = await getPost(requestBody, window.location.origin, false)
           checkOutItems.push({...itemData.data.post, orderData: item})
        //    setItemsData([...itemsData, {...itemData.data.post, orderData: item}])

        }
       setItemsData([ ...checkOutItems])
    }


    const renderCheckOutItems = (itemsData || []).map(item => {
        return (
            <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item} isPop={false}/>
        )
    })

    useEffect(() => {
        let totalPrice = 0
        itemsData.forEach(i=>{
            const totalItemPrice =Number(i.price) * Number(i.orderData.count)
            console.log(Number(i.price),Number(i.orderData.count),totalItemPrice)
            totalPrice += totalItemPrice
        })
        setState({
            ...state,
            totalPrice
        })
    }, [itemsData]);


    return (
        <AppLayout {...props}>
            <div className='main checkout-page'>
                <div className='checkout-items'>
                    {renderCheckOutItems}
                </div>
                <div className='checkout-total-purchase'>
                    <h3>Summary</h3>
                    <p>Total : {state.totalPrice} Euro</p>
                </div>
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = async ({req, query}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let errorCode = 200
    let settings;
    let widgets;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, domainName, true, 'tagsPage')

    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
    return {props: {...settings, isMobile: Boolean(isMobile), query, widgets}}
}


export default checkout;
