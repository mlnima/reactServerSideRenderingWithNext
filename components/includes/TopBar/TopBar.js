import React, {useContext, useEffect, useState} from 'react';
import Link from "next/link";
import {AppContext} from "../../../context/AppContext";
import {withRouter} from "next/router";
import SearchInputComponent from "../widgets/SearchInputComponent/SearchInputComponent";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faPowerOff, faSearch, faSign, faSignInAlt, faSignOutAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import NavigationMobileButton from "../Header/Navigation/NavigationMobileButton/NavigationMobileButton";
import LoggedInItemsForMenu from "../LoggedInItemsForMenu/LoggedInItemsForMenu";
import LoggedOutItemsMenu from "../LoggedOutItemsMenu/LoggedOutItemsMenu";
import ImageLogoInTopBar from "./ImageLogoInTopBar";

const TopBar = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        colorsStyle: {},
        mobileSearchBarOpen: false,
    });

    useEffect(() => {
        setState({
            ...state,
            colorsStyle: {
                backgroundColor: contextData.siteDesign.topBarBackgroundColor,
                color: contextData.siteDesign.topBarTextColor
            }
        })
    }, [contextData.siteDesign]);

    useEffect(() => {
        console.log(contextData.siteIdentity)
    }, [contextData.siteIdentity]);

    const onMobileSearchBarOpenHandler = () => {
        state.mobileSearchBarOpen ?
            setState({
                ...state,
                mobileSearchBarOpen: false
            }) :
            setState({
                ...state,
                mobileSearchBarOpen: true
            })
    }


    const SearchBarInTopBar = () => {
        if (contextData.siteIdentity.searchBarInTopBar) {
            if (window.innerWidth < 768) {
                if (state.mobileSearchBarOpen) {
                    return (
                        <div className='search-bar-top' >
                            <button style={state.colorsStyle} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon icon={faTimes} className='top-bar-item-logo'/></button>
                            <SearchInputComponent searchBtnBackgroundColor={state.colorsStyle.backgroundColor} searchBtnColor={state.colorsStyle.color}/>
                        </div>
                    )
                } else {
                    return (
                        <div className='search-bar-top'>
                            <button style={state.colorsStyle} className='top-bar-item' onClick={onMobileSearchBarOpenHandler}><FontAwesomeIcon icon={faSearch} className='top-bar-item-logo'/></button>
                        </div>
                    )
                }


            } else return (
                <div className='search-bar-top'>
                    <SearchInputComponent searchBtnBackgroundColor={state.colorsStyle.backgroundColor} searchBtnColor={state.colorsStyle.color}/>
                </div>
            )
        } else return null
    }


    const RenderAuthBtns = () => {
        if (contextData.userData.username  && !contextData.state.isMobile && contextData.siteIdentity.topBarAuthBtn) {
            return (
                <div className='auth-buttons'>
                    <LoggedInItemsForMenu visible={!contextData.state.isMobile} colorsStyle={state.colorsStyle} position='topBar'/>

                </div>
            )
        } else if (!contextData.userData.username && !contextData.state.isMobile && contextData.siteIdentity.topBarAuthBtn){
            return (
                <div className='auth-buttons'>
                    <LoggedOutItemsMenu visible={!contextData.state.isMobile} colorsStyle={state.colorsStyle} position='topBar'/>
                </div>
            )
        }else return null
    }


    if (contextData.siteIdentity.topBarVisibility) {
        return (
            <div className='top-bar' style={state.colorsStyle}>
                <NavigationMobileButton/>

                <RenderAuthBtns/>
                <ImageLogoInTopBar/>
                <SearchBarInTopBar/>
            </div>
        )
    } else return null

};

export default withRouter(TopBar);
