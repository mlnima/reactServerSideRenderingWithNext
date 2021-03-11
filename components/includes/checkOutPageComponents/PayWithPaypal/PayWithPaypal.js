import React, {useEffect, useState, useContext, useRef} from 'react';
import ReactDOM from "react-dom"
import {AppContext} from "../../../../context/AppContext";
const PayPalButton = paypal.Buttons.driver("react", {React, ReactDOM});

const PayWithPaypal = props => {
    const [state, setState] = useState({
        isPaid: false,
        gotError: null,
        isCheckout: false,
        isEnabled: false,
        loading: true,
        isReady: false
    });

    useEffect(() => {
        setTimeout(() => {
            setState({
                ...state,
                loading: false
            })
        }, 2000)
    }, []);


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'EUR',
                        value: props.total,
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();

        setState({
            ...state,
            isPaid: true
        })

    };




    if (props.active) {
        if (state.isPaid) {
            return (
                <h3>Thank you for your purchase</h3>
            )
        } else if (state.gotError) {
            return (
                <h3>Something went wrong please try again later</h3>
            )
        } else if (state.isCheckout) {
            return (
                <h3>payment on progress...</h3>
            )

        } else if (state.loading) {
            return (
                <h3>loading...</h3>
            )

        } else return (
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={err => {
                    setState({...state, gotError: err})
                    console.log(err)
                }}

            />
        )
    } else return null


};
export default PayWithPaypal;
