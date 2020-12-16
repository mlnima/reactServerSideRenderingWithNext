import React, {useEffect, useState, useContext, useRef} from 'react';
import CheckOutSlideHeader from "./CheckOutSlideHeader/CheckOutSlideHeader";
import {AppContext} from "../../../../context/AppContext";
import './CheckoutPop.scss'
import {getPost} from "../../../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../CheckOutItemPreview/CheckOutItemPreview";
import Link from "next/link";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CheckoutPop = props => {
    const contextData = useContext(AppContext);
    const [itemsData, setItemsData] = useState([])
    useEffect(() => {
        if (contextData.checkOutData.items.length > 0) {
            getCheckOutItems()
        }
    }, [contextData.checkOutData]);

    const getCheckOutItems = async () => {
        let checkOutItems = []
        for await (let item of contextData.checkOutData.items) {
            const requestBody = {
                _id: item.productId
            };
            const itemData = await getPost(requestBody, window.location.origin, false)
            checkOutItems.push({...itemData.data.post, orderData: item})

        }
        setItemsData(checkOutItems)
    }

    const renderCheckOutItems = (itemsData || []).map(item => {
        return (
            <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item}/>
        )
    })

    if (contextData.state.checkoutSlideEnable) {
        return (
            <div className='checkout-pop'>
                <div className='checkout-container'>
                    <CheckOutSlideHeader/>
                    {renderCheckOutItems}
                    <Link href="/checkout"><a className='check-out-pop-next-btn'><FontAwesomeIcon  className='check-out-pop-next-btn-icon'  icon={faCreditCard} /></a></Link>
                </div>
            </div>
        );
    } else return null

};
export default CheckoutPop;
