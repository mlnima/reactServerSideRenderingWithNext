import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";
import styled from "styled-components";
let StyledDiv = styled.div`

.navigation-mobile-button{
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0;
  width: 30px;
  height: 30px;
  transition: all .5s linear;
  .navigation-mobile-button-logo{
    width: 30px;
    height: 30px;
  }
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
    .menu-widget-item{
      list-style-type: none;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid ;

    }

  }
      .navigation-close-button{
  position: fixed;
  top:2%;
  right :2%;
  background-color: transparent;
  border: none;
    }
  @media only screen and (min-width: 768px) {
    .navigation-mobile-button{
      display: none;
    }

    .menu-widget-items{

      background-color: initial;
      flex-direction: row;
      width: initial;
      position: initial;
      animation: initial ;
      .menu-widget-item{
        margin: 0 10px;
        width:initial;
        text-align: left;
        padding: 0;
        border-bottom: none;
      }
      .navigation-close-button{
        display: none;
      }
}
  
`

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
       contextData.dispatchState({...contextData.state,loading:true})
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
                        <a rel='next' onClick={menuItem.target.includes('#')? null:mobileNavigationOnClickHandler}>
                            {menuItem.translations?.[router.locale]?.name || menuItem.name }
                        </a>
                    </Link>
                </li>
            )
        } else if (menuItem.type === 'external') {
            return (
                <li className='menu-widget-item' key={menuItem.name}>
                    <a href={menuItem.target} >{menuItem.name}</a>
                </li>
            )
        } else return null
    })


    return (
        <StyledDiv className='menu-widget'>
            <button
                onClick={() => open ? setOpen(false) : setOpen(true)}
                className='navigation-mobile-button' aria-label="Center Align">
                <FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo' style={{
                    maxWidth: '25px',
                    maxHeight: '25px',
                }}/>
            </button>

            <ul className='menu-widget-items' ref={menuItemsElement} style={{display: open ? 'flex' : 'none'}} >
                <button
                     onClick={() => open ? setOpen(false) : setOpen(true)}
                    className='navigation-close-button'>
                    <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo svg-logo-medium' style={{
                        maxWidth: '25px',
                        maxHeight: '25px'
                    }}/>
                </button>
                {renderMenuItems}
            </ul>
        </StyledDiv>
    );
};
export default MenuWidget;
