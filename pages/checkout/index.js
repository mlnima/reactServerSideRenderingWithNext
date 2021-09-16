import React, {useEffect, useState, useContext, useRef} from 'react';
import dynamic from 'next/dynamic'
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getFirstLoadData, getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";
import {getPost} from "../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview";
import {useRouter} from "next/router";
import _ from 'lodash'
const PayWithPayPal = dynamic(() => import('../../components/includes/checkOutPageComponents/PayWithPaypal/PayWithPaypal'), {ssr: false})
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
let StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .checkout-items{
    width: 90%;
    max-width: 600px;
    margin: auto;
  }

  .checkout-purchase{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 80%;
    max-width: 600px;

    background-color: white;
    margin: auto;
    padding: 15px;

    .checkout-total{
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 90%;
      h3, p{
        border-bottom: .1px solid black;
        width: 100%;
        padding: 5%;
      }
      .vat-included{
        font-size: .7rem;
      }
    }


    .check-out-pay-btn{
      border: .2px solid black;
      padding: 10px 20px;
      margin: 10px 20px;
      background-color: transparent;
    }
  }
  @media only screen and (min-width: 769px) {
 
    display: grid;
    grid-template-columns: 1fr 1fr;
     .checkout-items{
      // display: grid;
        margin-top: initial;
        width: 90%;
    }
    .checkout-purchase{
      margin-top: initial;
      width: 90%;

    }


}
`
const checkout = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';
    const [state, setState] = useState({
        paymentPage: false,
        isPaid: false,
        message:'',
        gotError: false,
        error: null,
        isCheckout: false,
        isEnabled: false,
        loading: true,
        isReady: false,
        currency: props?.eCommerce?.data?.currency,
        total: 0,
        totalPrice: 0
    });
    const [itemsData, setItemsData] = useState([])
    const [orderData, setOrderData] = useState({})


    //check if there is items in the basket and fetch data from DB
    useEffect(() => {
        if (contextData.checkOutData.items.length > 0) {
            setItemsData([])
            getCheckOutItems()
        }else if (contextData.checkOutData.items.length === 0){
            // router.push('/')
        }
    }, [contextData.checkOutData.items]);


    //create order from orderData for final payment
    const createOrder = (data, actions) => {
        return actions.order.create(orderData);
    };

    // create a order in DB after payment get approved
    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        const dataToCreateOrder = {
            type:'payPal',
            payPalData:order,
            userID:contextData.userData._id,
        }
        contextData.functions.createOrder(dataToCreateOrder).then(createdOrderResponse => {

            setState({
                ...state,
                isPaid: true,
                message: 'Thank you you will receive the confirmation message in a few hours '
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
                serverError: err,
                message: 'something went wrong with your order please contact our support'
            })
        })
    };

    const onErrorHandler = (err)=>{
        setState({
            ...props.state,
            gotError: true,
            error:err,
            message: 'something went wrong please ty again later'
        })
    }


    // sum only the price of the items
    const calculateTotalPrice = () => {
        let totalPrice = 0
        itemsData.forEach(i => {
            const totalItemPrice = Number(i.price) * Number(i.count)
            totalPrice += totalItemPrice
        })
        return totalPrice
    }


    //function to get checkoutItems data from database by ID
    const getCheckOutItems = async () => {
        Promise.all(contextData.checkOutData.items.map(item => getPost({_id: item.productId}, window.location.origin, false))).then(results => {
            setItemsData(results.map(result => {
                return {
                    title: result?.data?.post?.title,
                    mainThumbnail: result.data?.post?.mainThumbnail,
                    price: result.data?.post?.price,
                    shippingCost: result?.data?.post?.shippingCost ?? 0,
                    translations: result.data?.post?.translations,
                    ...contextData.checkOutData.items.find(item => item.productId === result.data?.post?._id)
                }
            }))
        })
    }

    // create order data for paypal from itemsData and store it in orderData
    useEffect(() => {
        if (itemsData.length > 0) {
            const VAT = props?.eCommerce?.data?.VAT ?? 0;
            const totalPriceValue = calculateTotalPrice();
            const defaultShippingCost = props?.eCommerce?.data?.defaultShippingCost ?? 0;
            let itemsShippingCosts = 0
            const totalItemsPrice = VAT === 0 ? totalPriceValue : ((totalPriceValue / 100) * VAT) + totalPriceValue;
            itemsData.forEach(itemData => itemData.shippingCost ? itemsShippingCosts += Number(itemData.shippingCost) : null)
            const totalPrice = totalItemsPrice + itemsShippingCosts

            setState({
                ...state,
                totalPrice
            })

            setOrderData({
                intent: "CAPTURE",
                purchase_units: [{
                    reference_id: '1',
                    amount: {
                        currency_code: props.eCommerce?.data?.currency,
                        value: totalPrice,
                        breakdown: {
                            // shipping: {currency_code: props.eCommerce.data.currency, value: defaultShippingCost},
                            item_total: {currency_code: props.eCommerce.data.currency, value: totalPrice},
                            // tax_total: {currency_code: props.eCommerce.data.currency, value: (orderPrice / 100) * 19},
                            // discount: {currency_code: props.eCommerce.data.currency, value: 0},
                        }
                    },
                    description:_.truncate(contextData.siteIdentity.title, { 'length': 20, 'separator': ' '})   ,
                    custom_id: '64735',
                    items: itemsData.map(itemData => {
                        return {
                            name:_.truncate(itemData.title, { 'length': 20, 'separator': ' '}) ,
                            unit_amount: {
                                currency_code: props.eCommerce.data.currency,
                                value: itemData.price
                            },
                            quantity: itemData.count,
                            description: `${itemData.count} x ${_.truncate(itemData.title, { 'length': 20, 'separator': ' '})} `
                        }
                    })
                }]
            })

        }
    }, [itemsData]);


    return (

            <div className='main checkout-page'>

                {/*render basket items*/}
                {!state.paymentPage ?
                    <div className='checkout-items'>
                        {itemsData.length > 0 ?
                            (itemsData || []).map(item => {
                                return (
                                    <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item} {...props} editable={!state.paymentPage}/>
                                )
                            })
                            : null
                        }
                    </div> :
                    //we need to add some login input or pay as guest form to get userData
                    <div className='checkout-items'>
                        <h2>{state.message}</h2>
                    </div>
                }


                <div className='checkout-purchase'>
                    {/*render subtotal text*/}
                    <div className='checkout-total'>
                        <h3>{props.eCommerce?.data?.translations?.[locale]?.summaryText || props.eCommerce?.data?.summaryText || 'Summary'}</h3>
                        <p>
                            <span>{props.eCommerce?.data?.translations?.[locale]?.totalText || props.eCommerce?.data?.totalText || 'Subtotal'} :</span>

                            <span>{new Intl.NumberFormat(props?.eCommerce?.data?.shopLocale || 'de-DE', {style: 'currency', currency: props.eCommerce?.data?.currency||'EUR'}).format(state.totalPrice)}</span>
                        </p>
                        <span className='vat-included'>{props?.eCommerce?.data?.translations?.[locale]?.VAT_includedText || 'VAT included.'}</span>
                    </div>


                    {/*button to render payments buttons*/}
                    {
                        !state.paymentPage ?
                            <button
                                className='pay-button check-out-pay-btn'
                                onClick={() => {
                                    setState({
                                        ...state,
                                        paymentPage: true,
                                        message: 'Waiting for the Payment'
                                    })
                                }}>
                                {contextData.state.activeLanguage === 'default' ? props.eCommerce?.data?.proceedToCheckOutText || 'Proceed To Checkout' : props.eCommerce?.data?.translations?.[contextData.state.activeLanguage]?.proceedToCheckOutText || 'Proceed To Checkout'}
                            </button>
                            : null
                    }
                    {/*render payments buttons*/}
                    {
                        state.paymentPage ?
                            <PayWithPayPal
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onErrorHandler={onErrorHandler}
                                // total={state.totalPrice}
                                active={state.paymentPage}
                                itemsData={itemsData}
                                state={state}
                                setState={setState}
                            /> : null
                    }

                </div>

            </div>

    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req,[])
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets:firstLoadData?.widgets || [],
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            query:context.query,
            referer:firstLoadData.referer}}
}

export default checkout;
