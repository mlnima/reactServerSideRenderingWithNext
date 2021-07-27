import {useEffect, useState, useContext, useRef} from 'react';
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
            window.innerWidth >= 768 ? setOpen(true) : setOpen(false)
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
        <ul className='menu-widget'>
        <style jsx>{`
            .menu-widget{
                background-color: var(--navigation-background-color);
                margin-block-start: 0;
                margin-block-end: 0;
                margin-inline-start: 0;
                margin-inline-end: 0;
                padding-inline-start: 0;
                
                .menu-widget-items{
                    background-color: var(--navigation-background-color);
                    position:fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    max-width: 50vw;
                    z-index: 1000;
                    display: none;
                    flex-direction: column;
                    justify-content: flex-start;
                    padding:  0;
                    align-items: center;
                    margin: 0;
                    
                    .navigation-close-button{
                        align-self: flex-end;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: transparent;
                        border: none;
                        width: 40px;
                        height: 40px;
                        color: var(--navigation-text-color);
                    }
                }  
                
                
            }
            .navigation-mobile-button{
                background-color: transparent;
                border: none;
                outline: none;
                margin: 0;
                transition: all .5s linear;
                color:var(--navigation-text-color);
            }

            @media only screen and (min-width: 768px) {
            .menu-widget{
               .menu-widget-items{
                    background-color: transparent;
                    display: flex;
                    flex-direction: row;
                    width: initial;
                    max-width: 100vw;
                    position: initial;
                    animation: initial ;
                    padding: 0;
                    margin:0;
                    .navigation-close-button{
                        display: none;
                    }
              }
            }
            .navigation-mobile-button{
                display: none;
            }            

            }
        `}</style>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button' aria-label="Center Align">
                <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}}  icon={faBars} className='navigation-mobile-button-logo' />
            </button>

            <ul className='menu-widget-items' ref={menuItemsElement} style={{display: open ? 'flex' : 'none'}}>
                <li onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-close-button'>
                        <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}}  icon={faTimes} className='navigation-mobile-button-logo' />
                </li>
                {renderMenuItems}
            </ul>

        </ul>
    );
};
export default MenuWidget;
