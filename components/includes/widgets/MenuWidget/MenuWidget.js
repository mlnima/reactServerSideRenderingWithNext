import {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";
import MenuWidgetItem from "./MenuWidgetItem";
import _ from "lodash";

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

    const renderMenuItemsData = (props.menuItems.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [])
    const renderMenuParentsItems = renderMenuItemsData.filter(i=>!i.parent)
    const renderMenuItems = renderMenuParentsItems.map(menuItem => {
   // console.log(renderMenuItemsData)



        const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? menuItem.as :
            (!router.locale && !router.query.locale) ? menuItem.as :
                `/${router.locale || router.query.locale}${menuItem.as}`;
        return(
            <MenuWidgetItem
                menuItem={menuItem}
                linkAsForMenuItems={linkAsForMenuItems}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
                menuItems={props.menuItems}
                key={_.uniqueId('id_')}

            />
        )
    })


    return (
        <ol className='menu-widget'>
        <style jsx>{`
            .menu-widget{
             background-color: var(--navigation-background-color);
                    margin-block-start: 0;
                    margin-block-end: 0;
                    margin-inline-start: 0;
                    margin-inline-end: 0;
                    padding-inline-start: 0;
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
        </ol>
    );
};
export default MenuWidget;
