import React, {useEffect, useState, useContext, useRef} from 'react';
import './MenuWidget.scss'
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MenuWidget = props => {
    const contextData = useContext(AppContext);
    const [open, setOpen] = useState(!props.isMobile);
    // useEffect(() => {
    //     console.log(props)
    // }, [props]);
    const renderMenuItems = (props.menuItems || []).map(menuItem => {

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


    return (
        <div className='menu-widget'>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button'>
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo' style={{
                    maxWidth: '25px',
                    maxHeight: '25px'
                }}/>
            </button>

            <ul className='menu-widget-items' style={{display: open ? 'flex' : 'none'}}>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-close-button'>
                    <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo svg-logo-medium' style={{
                        maxWidth: '25px',
                        maxHeight: '25px'
                    }}/>
                </button>
                {renderMenuItems}
            </ul>
        </div>
    );
};
export default MenuWidget;
