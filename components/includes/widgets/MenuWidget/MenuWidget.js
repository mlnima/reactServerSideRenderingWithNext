import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidget.scss'
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MenuWidget = props => {
    const contextData = useContext(AppContext);
    const [menuItems, setMenuItems] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (props.menuItems) {
            setMenuItems(props.menuItems)
        }
    }, [props]);


    const renderMenuItems = Object.keys(menuItems).map(menuItem => {

        if (menuItems[menuItem].type === 'internal') {
            return (
                <li>
                    <Link href={menuItems[menuItem].target} as={menuItems[menuItem].as}><a>{menuItems[menuItem].name}</a></Link>
                </li>
            )
        } else if (menuItems[menuItem].type === 'external') {
            return (
                <li>
                    <a href={menuItems[menuItem].target}>{menuItems[menuItem].name}</a>
                </li>
            )
        } else return null

    })


    if (contextData.state.isMobile && props.mobileNavigation) {
        return (
            <button onClick={()=>setOpen(true)}><FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo'  /></button>
        );
    } else {
        return (
            <ul>
                {renderMenuItems}
            </ul>
        );
    }
};
export default MenuWidget;
