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
    const [open, setOpen] = useState(false);

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
                    width: 90%;
                    //text-align: center;
                    padding: 10px 0;
                    font-size: 1.2rem;
                    //border-bottom: 1px solid ;
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
            .menu-widget{
             background-color: var(--navigation-background-color);
            }
            .navigation-mobile-button{
                background-color: transparent;
                border: none;
                outline: none;
                margin: 0;
                width: 40px;
                height: 40px;
                transition: all .5s linear;
                color:var(--navigation-text-color);
            }
            .navigation-mobile-button-logo{
                width: 40px;
                height: 40px;
            }
            .menu-widget-items{
            background-color: var(--navigation-background-color);
                position:fixed;
                top: 0;
                left: 0;
                //right: 0;
                bottom: 0;
                width: 100%;
                max-width: 50vw;
               
                z-index: 1000;
                //display: flex;
                display: none;
                flex-direction: column;
                justify-content: flex-start;
                padding: 48px 0 0 0;
                align-items: center;
                //margin: 48px 0 0 0;
                margin: 0;
            }  
            .navigation-close-button{
                position:fixed;
                top:5px;
                left :2px;
                background-color: transparent;
                border: none;
                width: 40px;
                height: 40px;
                color: var(--navigation-text-color);
                transform: rotate(90deg);
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
max-width: 100vw;
position: initial;
animation: initial ;
padding: 0;
margin:0;
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
