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
                <li className='menu-widget-item' key={menuItems[menuItem].name}>
                    <Link href={menuItems[menuItem].target} as={menuItems[menuItem].as}><a>{menuItems[menuItem].name}</a></Link>
                </li>
            )
        } else if (menuItems[menuItem].type === 'external') {
            return (
                <li className='menu-widget-item' key={menuItems[menuItem].name}>
                    <a href={menuItems[menuItem].target}>{menuItems[menuItem].name}</a>
                </li>
            )
        } else return null

    })

    useEffect(() => {
        if (!contextData.state.isMobile){
            setOpen(true)
        }
    }, [contextData.state.isMobile]);

    return (
        <div className='menu-widget'>
            <button style={{display:contextData.state.isMobile?'initial':'none'}} onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button'><FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo'/></button>
            <ul className='menu-widget-items' style={{display:open ? 'flex':'none'}}>
                {renderMenuItems}
            </ul>
        </div>
    );
};
export default MenuWidget;
