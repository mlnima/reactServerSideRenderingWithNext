import {useEffect, useState, useRef} from 'react';
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import MenuWidgetItem from "./MenuWidgetItem";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";


const MenuWidgetStyledDiv = styled.div`
  background-color: var(--navigation-background-color,#18181b);
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;

  .menu-widget-items {
    background-color: var(--navigation-background-color,#18181b);
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    align-items: center;
    margin: 0;
    transition: all 0.5s ease 0s;
    position: fixed;
    ${props=> props.open ?`animation: navigationMobileSlide .3s linear alternate;`: `animation: none;` }
    display: ${props=> props.open ? 'flex' : 'none'};

    .navigation-close-button {
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      width: 40px;
      height: 40px;
      color: var(--navigation-text-color, #ccc);
    }
  }
  .navigation-mobile-button {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    transition: all .5s linear;
    color: var(--navigation-text-color, #ccc);
    width: 24px;
    height: 24px;
    padding: 0;
  }

  @media only screen and (min-width: 768px) {
      background-color: transparent;
      .menu-widget-items {
        background-color: transparent;
        display: flex;
        flex-direction: row;
        width: initial;
        max-width: 100vw;
        position: initial;
        animation: initial;
        padding: 0;
        margin: 0;
        .navigation-close-button {
          display: none;
        }
      }
    
    .navigation-mobile-button {
      display: none;
    }

  }
`






const MenuWidget = props => {
    const menuItemsElement = useRef(null)
    const dispatch = useDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.innerWidth >= 768 ? setOpen(true) : setOpen(false)
        }
    }, [props]);

    const mobileNavigationOnClickHandler = () => {
        dispatch(setLoading(true))
        if (props.isMobile) {
            setOpen(false)
        }
    }

    const renderMenuItemsData = (props.menuItems.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [])
    const renderMenuParentsItems = renderMenuItemsData.filter(i => !i.parent)
    const renderMenuItems = renderMenuParentsItems.map((menuItem,index) => {

        const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL? menuItem.as :
                   (!router.locale && !router.query.locale) ? menuItem.as :
                  `/${router.locale || router.query.locale}${menuItem.as}`;
        return (
            <MenuWidgetItem
                menuItem={menuItem}
                linkAsForMenuItems={linkAsForMenuItems}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
                menuItems={props.menuItems}
                key={index}

            />
        )
    })


    return (
        <MenuWidgetStyledDiv className='menu-widget' open={open}>
            <ul onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button' aria-label="Center Align">
                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color, #ccc)'}} icon={faBars} className='navigation-mobile-button-logo'/>
            </ul>
            <ul className='menu-widget-items' ref={menuItemsElement}>
                <li onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-close-button'>
                    <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color, #ccc)'}} icon={faTimes} className='navigation-mobile-button-logo'/>
                </li>
                {renderMenuItems}
            </ul>
        </MenuWidgetStyledDiv>
    );
};
export default MenuWidget;



