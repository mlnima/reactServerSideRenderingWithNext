import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";


const MenuWidget = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let deviceWidth = 0
            deviceWidth = window.innerWidth
            deviceWidth >= 768 ? setOpen(true) : setOpen(false)
        }

    }, [props]);

    const mobileNavigationOnClickHandler = () => {
       // contextData.dispatchState({...contextData.state,loading:true})
        if (props.isMobile) {
            setOpen(false)
        }
    }

    const renderMenuItems = (props.menuItems.sort((a,b)=>a.itemIndex>b.itemIndex?1:-1) || []).map(menuItem => {
        if (menuItem.type === 'internal') {
            const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? menuItem.as :
                (!router.locale && !router.query.locale) ? menuItem.as :
                    `/${router.locale || router.query.locale}${menuItem.as}`;

            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <Link href={menuItem.target} as={linkAsForMenuItems} scroll={false}>
                        <a onClick={menuItem.target.includes('#')? null:mobileNavigationOnClickHandler}>
                            {menuItem.translations?.[router.locale]?.name || menuItem.name }
                        </a>
                    </Link>
                </li>
            )
        } else if (menuItem.type === 'external') {
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <a href={menuItem.target} onClick={menuItem.target.includes('#')? null:mobileNavigationOnClickHandler}>{menuItem.name}</a>
                </li>
            )
        } else return null
    })


    return (
        <div className='menu-widget'>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button' aria-label="Center Align">
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
