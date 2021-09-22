import React, {useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import _ from "lodash";
import {faBars, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MenuWidgetItemLink from "./MenuWidgetItemLink";
import styled from "styled-components";

const MenuWidgetSubItemStyledLi = styled.li`
  .menu-widget-sub-item {
    display: ${props=>props.showSub ? 'initial' : 'none'};
    z-index: 10;
    background-color: var(--navigation-background-color);
    width: 100px;
    list-style-type: none;
    padding: 10px 15px;

  }

  @media only screen and (min-width: 768px) {
    .menu-widget-sub-item {
      background-color: transparent;
    }
  }
`

const MenuWidgetStyledLi = styled.li`
  list-style-type: none;
  width: 90%;
  padding: 10px 0;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: ${props=> !props.menuItem.parent ? '0 10px' : '0'};

  .open-submenus {
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .navigation-dropdown-icon {
    width: 10px;
    height: 10px;
    color: var(--navigation-text-color);
  }

  .dropdown-content {
    width: 100%;
    max-width: 200px;
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
      font-size: 1rem;
      width: ${props=> !props.menuItem.parent ? (props.menuItem.subItems || []).length > 0 ? 'auto' : 'auto' : '50px '};
      background-color: transparent;
  }
`




const MenuWidgetItem = ({menuItem, linkAsForMenuItems, mobileNavigationOnClickHandler, menuItems}) => {

    const [showSub, setShowSub] = useState(false)
    const router = useRouter()

    const renderSubMenus = (menuItem.subItems || []).map(subItem => {

        const linkAsForMenuItem = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? subItem.as :
            (!router.locale && !router.query.locale) ? subItem.as :
                `/${router.locale || router.query.locale}${subItem.as}`;

        return (
            <MenuWidgetSubItemStyledLi showSub={showSub} className='menu-widget-sub-item' key={_.uniqueId('id_')}>
                <MenuWidgetItemLink
                    linkTargetType={subItem?.type}
                    linkType='sub'
                    linkTargetUrl={subItem?.target}
                    linkAs={linkAsForMenuItem}
                    linkName={subItem?.name}
                    linkTranslations={subItem?.translations}
                    showSub={showSub}
                    mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
                />
            </MenuWidgetSubItemStyledLi>
        )
    })


    const onOpenSubmenusHandler = () => {
        showSub ? setShowSub(false) : setShowSub(true)
    }

    return (

        <MenuWidgetStyledLi menuItem={menuItem} key={_.uniqueId('id_')} className='menu-widget-item' onMouseEnter={menuItem.subItems?.length > 0 ? onOpenSubmenusHandler : null} onMouseLeave={menuItem.subItems?.length > 0 ? onOpenSubmenusHandler : null}>


            <MenuWidgetItemLink
                linkTargetType={menuItem?.type}
                linkType='parent'
                linkTargetUrl={menuItem?.target}
                linkAs={linkAsForMenuItems}
                linkName={menuItem?.name}
                linkTranslations={menuItem?.translations}
                showSub={showSub}
                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}
            />
            {menuItem?.subItems?.length > 0 ?
                <span className='open-submenus' aria-label='Center Align' onClick={onOpenSubmenusHandler}>
                    <FontAwesomeIcon icon={showSub ? faSortUp : faSortDown} className='navigation-dropdown-icon' style={{color: 'white', width: '20px', height: '20px'}}/>
                </span>
                : null}

            {showSub ?
                <ul className='dropdown-content'>
                    {renderSubMenus}
                </ul>
                : null
            }

        </MenuWidgetStyledLi>
    );
};
export default MenuWidgetItem;


