import React, {useEffect, useState, useContext, useRef} from 'react';
import dynamic from 'next/dynamic'
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";
import {getPost} from "../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview";

const PayWithPayPal = dynamic(() => import('../../components/includes/checkOutPageComponents/PayWithPaypal/PayWithPaypal'), {ssr: false})

const checkout = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        paymentPage: false,
        isPaid: false,
        gotError: false,
        error: null,
        isCheckout: false,
        isEnabled: false,
        loading: true,
        isReady: false,
        currency: props.eCommerce.data.currency,
        total: 0
    });
    const [itemsData, setItemsData] = useState([])
    const [purchaseUnits, setPurchaseUnits] = useState([])


    useEffect(() => {
        if (contextData.checkOutData.items.length > 0) {
            setItemsData([])
            getCheckOutItems()
        }
    }, [contextData.checkOutData.items]);


    const createOrder = (data, actions) => {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: purchaseUnits
        });
    };

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        contextData.functions.createOrder('payPal', order, {}).then(createdOrderResponse => {
            console.log(createdOrderResponse)
            setState({
                ...state,
                isPaid: true
            })
            localStorage.removeItem('checkOutItems')
            contextData.setCheckOutData({
                ...contextData.checkOutData,
                items: []
            })
        }).catch(err => {
            console.log(err)
            setState({
                ...state,
                serverError: err
            })
        })
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0
        itemsData.forEach(i => {
            const totalItemPrice = Number(i.price) * Number(i.count)
            totalPrice += totalItemPrice
        })
        return totalPrice
    }

    const getCheckOutItems = async () => {
        Promise.all(contextData.checkOutData.items.map(item => getPost({_id: item.productId}, window.location.origin, false))).then(results => {
            setItemsData(results.map(result => {
                return {
                    title: result.data.post.title,
                    mainThumbnail: result.data.post.mainThumbnail,
                    price: result.data.post.price,
                    translations: result.data.post.translations,
                    ...contextData.checkOutData.items.find(item => item.productId === result.data.post._id)
                }
            }))
        })
    }


    useEffect(() => {
        if (itemsData.length > 0) {
            setPurchaseUnits([
                ...purchaseUnits,
                ...itemsData.map(itemData => {
                    const orderPrice = Number(itemData.price) * Number(itemData.count)
                    return {
                        description: itemData.title,
                        reference_id: itemData.productId,
                        amount: {
                            currency_code: props.eCommerce.data.currency,
                            value: orderPrice,
                            breakdown: {
                                // shipping: {currency_code: props.eCommerce.data.currency, value: (orderPrice / 100) * 2},
                                // item_total: {currency_code: props.eCommerce.data.currency, value: orderPrice},
                                // tax_total: {currency_code: props.eCommerce.data.currency, value: (orderPrice / 100) * 19},
                                // discount: {currency_code: props.eCommerce.data.currency, value: 0},
                            }
                        }
                    }

                })
            ])
        }
    }, [itemsData]);


    useEffect(() => {
        console.log(itemsData)
    }, [itemsData]);

    return (
        <AppLayout {...props}>
            <div className='main checkout-page'>
                <div className='checkout-items'>
                    {itemsData.length > 0 ?
                        (itemsData || []).map(item => {
                            return (
                                <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item} {...props} editable={!state.paymentPage}/>
                            )
                        })
                        : null
                    }
                </div>
                <div className='checkout-purchase'>
                    <div className='checkout-total'>
                        <h3>{contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.summaryText || 'Summary' : props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.summaryText || 'Summary'}</h3>
                        <p>
                            {contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.totalText ?? 'Subtotal' : props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.totalText ?? 'Subtotal'}
                            :
                            {props.eCommerce?.data?.currencySymbol ? ' ' + props.eCommerce?.data?.currencySymbol + ' ' : ' € '}
                            {calculateTotalPrice()}
                        </p>
                    </div>
                    {
                        !state.paymentPage ?
                            <button
                                className='pay-button check-out-pay-btn'
                                onClick={() => {
                                    setState({...state, paymentPage: true})
                                }}>
                                {contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.proceedToCheckOutText || 'Proceed To Checkout' : props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.proceedToCheckOutText || 'Proceed To Checkout'}
                            </button>
                            : null
                    }
                    {
                        state.paymentPage ?
                            <PayWithPayPal
                                createOrder={createOrder}
                                onApprove={onApprove}
                                total={state.totalPrice}
                                active={state.paymentPage}
                                itemsData={itemsData}
                                state={state}
                                setState={setState}
                            /> :

                            null
                    }

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
