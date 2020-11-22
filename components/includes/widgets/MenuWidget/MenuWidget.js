import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidget.scss'
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MenuWidget = props => {
    const contextData = useContext(AppContext);
    const [menuItems, setMenuItems] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (props.menuItems) {
            if(props.menuItems.length>0){
                setMenuItems(props.menuItems)
            }
        }
    }, [props]);

    const renderMenuItems = (menuItems || []).map(menuItem => {

        if (menuItem.type === 'internal') {
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <Link href={menuItem.target} as={menuItem.as}><a>{menuItem.name}</a></Link>
                </li>
            )
        } else if (menuItem.type === 'external') {
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <a href={menuItem.target}>{menuItem.name}</a>
                </li>
            )
        } else return null

    })


    useEffect(() => {
        if (!contextData.state.isMobile) {
            setOpen(true)
        }
    }, [contextData.state.isMobile]);

    return (
        <div className='menu-widget'>
            <button style={{display: contextData.state.isMobile ? 'initial' : 'none'}} onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button'>
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo'/>
            </button>

            <ul className='menu-widget-items' style={{display: open ? 'flex' : 'none'}}>
                <button style={{display: contextData.state.isMobile ? 'initial' : 'none'}} onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-close-button'>
                    <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo svg-logo-medium'/>
                </button>
                {renderMenuItems}
            </ul>
        </div>
    );
};
export default MenuWidget;
