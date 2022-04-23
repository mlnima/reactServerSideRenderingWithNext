import {FC, useState} from "react";
import {useMemo} from 'react';
import {MenuItem} from "@_variables/TypeScriptTypes/WidgetsInterfaces";
import styled from "styled-components";
import MenuWidgetItem from "./MenuWidgetItem";

const MenuWidgetStyledDiv = styled.div`
  z-index: 10;

  .menu-widget-open-button {
    margin: 0;
    padding: 6px 12px;
    width: 18px;
    height: 16px;
    background-color: var(--navigation-text-color, #ccc);
    mask: url('/public/asset/images/icons/bars-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/bars-solid.svg') no-repeat center;
  }

  .menu-widget-items {
    background-color: var(--navigation-background-color, #18181b);
    top: 0;
    left: 0;
    bottom: 0;
    width: 85%;
    z-index: 1000;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px 0 0 0;
    align-items: flex-start;
    margin: 0;
    transition: all 0.5s ease 0s;
    position: fixed;
    animation:  ${(props: { open: boolean }) => props?.open ? `navigationMobileSlide .2s linear alternate` : `none`};
    display: ${(props: { open: boolean }) => props.open ? 'flex' : 'none'};
    overflow-y: auto;

    .menu-widget-close-button {
      position: absolute;
      top: 16px;
      right: 25px;
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      width: 18px;
      height: 18px;
      color: var(--navigation-text-color, #ccc);
      padding: 6px;

      .menu-widget-close-button-logo {
        width: 18px;
        height: 18px;
        padding: 6px;
        background-color: var(--navigation-text-color, #ccc);
        mask: url('/public/asset/images/icons/xmark-solid.svg') no-repeat center;
        -webkit-mask: url('/public/asset/images/icons/xmark-solid.svg') no-repeat center;
      }
    }

    .menu-item {
      list-style-type: none;
     
      width: 100%;

      .menu-item-link {
        color: var(--navigation-text-color, #ccc);
        background-color: transparent;
        font-weight: bold;
        font-size: 1em;
        text-decoration: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
    .menu-widget-open-button {
      display: none;
    }

    .menu-widget-items {
      width: 100%;
      position: initial;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin: auto;
      padding: 0;
      .menu-widget-close-button{
        display: none;
      }
      .menu-item{
        margin: 0 10px;
        display: block;
        white-space: nowrap;
      }
    }
  }
`

interface MenuWidgetPropTypes {
    menuItems: MenuItem[]
}

const MenuWidget: FC<MenuWidgetPropTypes> = ({menuItems}) => {

    const [open, setOpen] = useState(null);
    const menuItemsInOrder = useMemo(() => {
        return menuItems.filter((menuItem: MenuItem) => !menuItem.parent)
            .sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [];
    }, [menuItems])

    return (
        <MenuWidgetStyledDiv open={open} className={'menu-widget'}>
            <ul onClick={() => setOpen(!open)}
                className='menu-widget-open-button btn btn-transparent-light'
                aria-label="open navigation">
            </ul>
            <ul className='menu-widget-items'>
                <li onClick={() => setOpen(!open)}
                    className='menu-widget-close-button  btn btn-transparent-light'>
                    <span className='menu-widget-close-button-logo'/>
                </li>
                {menuItemsInOrder.map(menuItem => {
                    return (
                        <MenuWidgetItem menuItem={menuItem}
                                        key={menuItem.itemIndex}
                                        setOpen={setOpen}
                        />
                    )
                })}
            </ul>
        </MenuWidgetStyledDiv>
    )

};
export default MenuWidget;
