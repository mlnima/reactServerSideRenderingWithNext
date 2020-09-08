import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../../context/AppContext";
import {withRouter} from "next/router";
import NavigationMobileButton from "../Header/Navigation/NavigationMobileButton/NavigationMobileButton";
import WidgetsRenderer from "../WidgetsRenderer/WidgetsRenderer";

const TopBar = props => {
    const contextData = useContext(AppContext);

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

    if (contextData.siteIdentity.topBarVisibility || ((contextData.navigationData || []).length > 0) && contextData.state.isMobile) {
        return (
            <div className='top-bar' >
                <div className='top-bar-items'>
                    <NavigationMobileButton/>
                    <WidgetsRenderer widgets={contextData.siteWidgets} position='topBar'/>
                </div>
            </div>
        )
    } else return null

};

export default withRouter(TopBar);
