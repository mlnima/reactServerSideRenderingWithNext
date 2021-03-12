import React from 'react';
import ReactDOM from "react-dom";
const PayPalButton = paypal.Buttons.driver("react", {React, ReactDOM});

const PayWithPayPal = props => {
    return (
        <PayPalButton
            createOrder={(data, actions) => props.createOrder(data, actions)}
            onApprove={(data, actions) => props.onApprove(data, actions)}
            onError={error => {
                props.setState({
                    ...props.state,
                    gotError: true,
                    error})
                console.log(error)
            }}
        />
    )
};
export default PayWithPayPal;
