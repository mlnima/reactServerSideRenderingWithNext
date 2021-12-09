import {useEffect, useState, useRef} from 'react';
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import MenuWidgetItem from "./MenuWidgetItem";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {checkRouteAndSetLoading} from "../../../../store/actions/globalStateActions";

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
    width: 90%;
    z-index: 1000;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    align-items: center;
    margin: 0;
    transition: all 0.5s ease 0s;
    position: fixed;
    ${props=> props?.open ?`animation: navigationMobileSlide .3s linear alternate;`: `animation: none;` }
    display: ${props=> props.open ? 'flex' : 'none'};
    overflow-y: auto;
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
      padding: 12px;
      svg{
        width: 24px;
        height: 24px;
      }
    }
  }
  .navigation-mobile-button {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 8px;
    transition: all .5s linear;
    color: var(--navigation-text-color, #ccc);
    width: 24px;
    height: 24px;
  }
  .navigation-mobile-button-open{
    padding: 0;
    margin: 8px;
    color: var(--navigation-text-color, #ccc);
    svg{
      width: 24px;
      height: 24px;
    }
  }

  @media only screen and (min-width: 768px) {
      background-color: transparent;
      .menu-widget-items {
        background-color: transparent;
        display: flex;
        align-items: center;
        flex-direction: row;
        width: initial;
        max-width: 100vw;
        position: initial;
        animation: initial;
        padding: 0;
        margin: 0;
        height: 56px;
        overflow-y: initial;
        .navigation-close-button {
          display: none;
        }
      }

    .navigation-mobile-button-open {
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

    const mobileNavigationOnClickHandler = (nextPath) => {
        dispatch(checkRouteAndSetLoading(router.asPath,nextPath))
    }
    const renderMenuItemsData = (props.menuItems.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [])
    const renderMenuParentsItems = renderMenuItemsData.filter(i => !i.parent)
    const renderMenuItems = renderMenuParentsItems.map((menuItem,index) => {

        const linkAsForMenuItems = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? menuItem.as :
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
            <ul onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-mobile-button-open btn btn-transparent-light' aria-label="Center Align">
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo'/>
            </ul>
            <ul className='menu-widget-items' ref={menuItemsElement}>
                <li onClick={() => open ? setOpen(false) : setOpen(true)} className='navigation-close-button btn btn-transparent-light'>
                    <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo'/>
                </li>
                {renderMenuItems}
            </ul>
        </MenuWidgetStyledDiv>
    );
};
export default MenuWidget;



