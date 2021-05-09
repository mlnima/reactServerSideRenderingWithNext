import {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";

const MenuWidget = props => {
    const contextData = useContext(AppContext);
    const menuItemsElement = useRef(null)
    const router = useRouter()
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let deviceWidth = 0
            deviceWidth = window.innerWidth
            deviceWidth >= 768 ? setOpen(true) : setOpen(false)
        }

    }, [props]);

    const mobileNavigationOnClickHandler = () => {
        contextData.dispatchState({...contextData.state, loading: true})
        if (props.isMobile) {
            setOpen(false)
        }
    }

    const renderMenuItems = (props.menuItems.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || []).map(menuItem => {

        const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? menuItem.as :
            (!router.locale && !router.query.locale) ? menuItem.as :
                `/${router.locale || router.query.locale}${menuItem.as}`;

        return (
            <li className='menu-widget-item' key={menuItem.name}>
            <style jsx>{`
                .menu-widget-item{
                    list-style-type: none;
                    width: 100%;
                    text-align: center;
                    padding: 10px 0;
                    border-bottom: 1px solid ;
                }
                .menu-widget-item-link{
                    color: var(--navigation-text-color);
                    text-decoration: none;
                }
                @media only screen and (min-width: 768px) {
                    .menu-widget-item{
                        margin: 0 10px;
                        width:initial;
                        text-align: left;
                        padding: 0;
                        border-bottom: none;
                        text-decoration: none;
                    }
                }
            `}</style>
                {menuItem.type === 'internal' ?
                    <Link href={menuItem.target} as={linkAsForMenuItems} scroll={false}>
                        <a className='menu-widget-item-link' rel='next' onClick={menuItem.target.includes('#') ? null : mobileNavigationOnClickHandler}>
                            {menuItem.translations?.[router.locale]?.name || menuItem.name}
                        </a>
                    </Link> :
                    <a className='menu-widget-item-link' href={menuItem.target}>{menuItem.name}</a>
                }
            </li>
        )
    })


    return (
        <div className='menu-widget'>
        <style jsx>{`
            .navigation-mobile-button{
                background-color: transparent;
                border: none;
                outline: none;
                margin: 0;
                width: 30px;
                height: 30px;
                transition: all .5s linear;
                color:var(--navigation-text-color);
            }
            .navigation-mobile-button-logo{
                width: 30px;
                height: 30px;
            }
            .menu-widget-items{
            
                position:fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                background-color: rgba(0,0,0,.8);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0;
                margin: 0;
            }  
            .navigation-close-button{
                position: fixed;
                top:2%;
                right :2%;
                background-color: transparent;
                border: none;
                width: 30px;
                height: 30px;
                color: var(--navigation-text-color);
            } 
            @media only screen and (min-width: 768px) {
                .navigation-mobile-button,.navigation-close-button{
                    display: none;
                }
                .menu-widget-items{
                    background-color: initial;
                    display: flex;
                    flex-direction: row;
                    width: initial;
                    position: initial;
                    animation: initial ;
                }
            }
        `}</style>
            <button
                onClick={() => open ? setOpen(false) : setOpen(true)}
                className='navigation-mobile-button' aria-label="Center Align">
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo' />
            </button>

            <ul className='menu-widget-items' ref={menuItemsElement} style={{display: open ? 'flex' : 'none'}}>
                <button
                    onClick={() => open ? setOpen(false) : setOpen(true)}
                    className='navigation-close-button'>
                    <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo svg-logo-medium' />
                </button>
                {renderMenuItems}
            </ul>
        </div>
    );
};
export default MenuWidget;
