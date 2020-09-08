import React, {useEffect, useState, useContext, useRef} from 'react';
import './NavigationMobileButton.scss'
import {AppContext} from "../../../../../context/AppContext";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavigationMobileButton = props => {
    const contextData = useContext(AppContext);
    const navigationMobileBtn = useRef(null)
    const [navigationBtnData,setNavigationBtnData] = useState({
        style:{}
    })

    const [state, setState] = useState({
        colorsStyle: {},
    });
    // useEffect(() => {
    //     setState({
    //         ...state,
    //         colorsStyle: {
    //             backgroundColor: contextData.siteDesign.topBarBackgroundColor,
    //             color: contextData.siteDesign.topBarTextColor
    //         }
    //     })
    // }, [contextData.siteDesign]);



    const onNavigationMobileBtnClickHandler = () => {
        if (contextData.state.navigationOpenStatus){
            contextData.dispatchState({
                ...contextData.state,
                navigationOpenStatus:false
            })


            setNavigationBtnData({
                ...navigationBtnData,
                style: {
                    ...navigationBtnData,
                    transform:'rotate(0deg)'
                }
            })
        }else {
            contextData.dispatchState({
                ...contextData.state,
                navigationOpenStatus:true
            })


            setNavigationBtnData({
                ...navigationBtnData,
                style: {
                    ...navigationBtnData,
                    transform:'rotate(-90deg)'
                }
            })
        }
    }

    if (window.innerWidth<=768){
        return (
            <button style={{...state.colorsStyle}}  ref={navigationMobileBtn} className='navigationMobileBtn'
                    onClick={onNavigationMobileBtnClickHandler}>
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo'  />
            </button>
        );
    }else return null

};
export default NavigationMobileButton;
