import React, {useEffect, useState, useContext, useRef} from 'react';
import CheckOutSlideHeader from "./CheckOutSlideHeader/CheckOutSlideHeader";
import {AppContext} from "../../../../context/AppContext";
import './CheckoutPop.scss'
import {getPost} from "../../../../_variables/ajaxPostsVariables";
import CheckOutItemPreview from "../CheckOutItemPreview/CheckOutItemPreview";
import Link from "next/link";
import { faShoppingCart} from "@fortawesome/free-solid-svg-icons";
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
            <CheckOutItemPreview key={(itemsData || []).indexOf(item)} {...item} isPop={true}/>
        )
    })

    const onLinkClickHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            checkoutSlideEnable: false
        })
    }




    if (contextData.state.checkoutSlideEnable) {
        return (
            <div className='checkout-pop'>
                <div className='checkout-container'>
                    <CheckOutSlideHeader/>
                    {renderCheckOutItems}
                    <div className='check-out-pop-next'>
                        <Link href="/checkout" ><a className='check-out-pop-next-btn' onClick={onLinkClickHandler}><FontAwesomeIcon  className='check-out-pop-next-btn-icon'  icon={faShoppingCart} /></a></Link>
                    </div>

                </div>
            </div>
        );
    } else return null

};
export default CheckoutPop;
