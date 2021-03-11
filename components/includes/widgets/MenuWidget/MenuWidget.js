import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";


const MenuWidget = props => {
    const [open, setOpen] = useState(!props.isMobile);
    const router = useRouter()
    useEffect(() => {
        let deviceWidth = 0
        if (typeof window !== 'undefined'){
            deviceWidth = window.innerWidth
            deviceWidth >=768 ? setOpen(true):null
        }

    }, [props]);

    const mobileNavigationOnClickHandler= ()=>{
        if (props.isMobile){
            setOpen(false)
        }
    }

    const renderMenuItems = (props.menuItems || []).map(menuItem => {

        if (menuItem.type === 'internal') {
            const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? menuItem.as :
                 (!router.locale && !router.query.locale)?menuItem.as :
                `/${router.locale || router.query.locale}${menuItem.as}`
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <Link href={menuItem.target}
                          as={linkAsForMenuItems}
                          locale={router.locale || router.query.locale || false}
                    >
                        <a  onClick={mobileNavigationOnClickHandler} >
                            {menuItem.name}
                        </a>
                    </Link>
                </li>
            )
        } else if (menuItem.type === 'external') {
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <a href={menuItem.target} onClick={mobileNavigationOnClickHandler}>{menuItem.name}</a>
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
