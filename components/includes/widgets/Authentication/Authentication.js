import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";

const Authentication = props => {
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
            },
            itemsColorStyle:{
                backgroundColor: 'transparent',
                color: contextData.siteDesign.topBarTextColor
            }
        })
    }, [contextData.siteDesign]);

    const RenderAuthBtns = () => {
        if (contextData.userData.username && !contextData.state.isMobile ) {
            return (
                <div className='auth-buttons'>
                    <LoggedInItemsForMenu visible={!contextData.state.isMobile} colorsStyle={state.itemsColorStyle} position='topBar'/>

                </div>
            )
        } else if (!contextData.userData.username && !contextData.state.isMobile ) {
            return (
                <div className='auth-buttons'>
                    <LoggedOutItemsMenu visible={!contextData.state.isMobile} colorsStyle={state.itemsColorStyle} position='topBar'/>
                </div>
            )
        } else return null
    }

    return (

            <RenderAuthBtns/>

    );
};
export default Authentication;
