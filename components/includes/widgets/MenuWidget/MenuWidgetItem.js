import React, {useState} from 'react';
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MenuWidgetItemLink from "./MenuWidgetItemLink";
import styled from "styled-components";
import {useRouter} from "next/router";

const MenuWidgetSubItemStyledLi = styled.li`

  .menu-widget-sub-item {
    display: ${props => props.showSub ? 'initial' : 'none'};
    z-index: 10;
    background-color: var(--navigation-background-color, #18181b);
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
  width: 85%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: linear-gradient( 180deg,rgba(41,41,41,.5) .12%,rgba(30,30,30,.5) 100%);
  margin:  5px;
  
  .menu-widget-item-link {
    color: var(--navigation-text-color, #ccc);
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    margin-right:  5px;
    padding: 13px 5px ;
    border-radius: 10px;
    &:active{
      filter: invert(70%);
    }
  }

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
    color: var(--navigation-text-color, #ccc);
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
    height: initial;
    font-size: 1rem;
    width: ${props => !props?.menuItem.parent ? (props?.menuItem.subItems || []).length  ? 'auto' : 'auto' : '50px '};
    background: initial;
    padding: 6px;
    margin: 0;
    .menu-widget-item-link {
      height: initial;
      padding: 0 ;
      margin-left:  0;
    }
  }
`

const MenuWidgetItem = ({menuItem, linkAsForMenuItems, mobileNavigationOnClickHandler}) => {
    const router = useRouter()
    const [showSub, setShowSub] = useState(false)
    const renderSubMenus = (menuItem.subItems || []).map((subItem, index) => {

        return (
            <MenuWidgetSubItemStyledLi showSub={showSub} className='menu-widget-sub-item' key={index}>
                <MenuWidgetItemLink
                    linkTargetType={subItem?.type}
                    linkType='sub'
                    linkTargetUrl={subItem?.target}
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

        <MenuWidgetStyledLi menuItem={menuItem}
                            className={'menu-widget-item  btn btn-navigation'}
                            onMouseEnter={menuItem.subItems?.length ? onOpenSubmenusHandler : null}
                            onMouseLeave={menuItem.subItems?.length ? onOpenSubmenusHandler : null}
                            activeLink={menuItem?.target ? router.asPath.includes(menuItem?.target) :false}
        >
            <MenuWidgetItemLink
                                linkTargetType={menuItem?.type}
                                linkType={'parent'}
                                linkTargetUrl={menuItem?.target}
                                linkAs={linkAsForMenuItems}
                                linkName={menuItem?.name}
                                linkTranslations={menuItem?.translations}
                                showSub={showSub}
                                mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}

            />
            {menuItem?.subItems?.length ?
                <span className='open-submenus' aria-label='Center Align' onClick={onOpenSubmenusHandler}>
                    <FontAwesomeIcon icon={showSub ? faSortUp : faSortDown} className='navigation-dropdown-icon' style={{color: 'white', width: '20px', height: '20px'}}/>
                </span>
                : null
            }

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


