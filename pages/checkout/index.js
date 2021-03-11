import React, {useEffect, useState, useContext, useRef} from 'react';
import dynamic from 'next/dynamic'
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";
import {getPost} from "../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview";
//import Link from "next/link";
//import CheckOutSlideHeader from "../../components/includes/checkOutPageComponents/CheckoutPop/CheckOutSlideHeader/CheckOutSlideHeader";


const PayWithPaypal = dynamic(() => import('../../components/includes/checkOutPageComponents/PayWithPaypal/PayWithPaypal'), {ssr: false})


const checkout = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        paymentPage:false
    });
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
        setItemsData([...checkOutItems])
    }

    const renderCheckOutItems = (itemsData || []).map(item => {
        return (
            <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item} isPop={false} editable={!state.paymentPage}/>
        )
    })

    useEffect(() => {
        let totalPrice = 0
        itemsData.forEach(i => {
            const totalItemPrice = Number(i.price) * Number(i.orderData.count)
            totalPrice += totalItemPrice
        })
        setState({
            ...state,
            totalPrice
        })
    }, [itemsData]);



    const PayBtn = ()=>{
        if (!state.paymentPage){
            return (
                <button className='pay-button check-out-pay-btn' onClick={()=>{setState({...state,paymentPage: true})}}>{contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.proceedToCheckOutText || 'Proceed To Checkout': props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.proceedToCheckOutText || 'Proceed To Checkout'}</button>
            )
        }else return null
    }



    return (
        <AppLayout {...props}>
            <div className='main checkout-page'>
                <div className='checkout-items'>
                    {renderCheckOutItems}
                </div>
                <div className='checkout-purchase'>
                    <div className='checkout-total'>
                        <h3>{ contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.summaryText || 'Summary': props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.summaryText || 'Summary' }</h3>
                        <p>
                            { contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.totalText ?? 'Subtotal': props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.totalText ?? 'Subtotal' }
                            :
                            { props.eCommerce?.data?.currencySymbol ? ' ' + props.eCommerce?.data?.currencySymbol + ' ' : ' € '}
                            {state.totalPrice}
                        </p>
                    </div>
                    <PayBtn/>
                    <PayWithPaypal total={state.totalPrice} active={state.paymentPage} />
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
